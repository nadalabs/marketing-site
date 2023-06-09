import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { sanityClient } from 'lib/sanity.server';

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
};

const CONTENT_UPDATED_QUERY = `*[_type == "content" && _id == $id].label.current`;
const LEGAL_UPDATED_QUERY = `*[_type == "legal" && _id == $id].slug.current`;
const PARTNER_UPDATED_QUERY = `*[_type == "partner" && _id == $id].slug.current`;
const POST_UPDATED_QUERY = `*[_type == "post" && _id == $id].slug.current`;
const PRESS_UPDATED_QUERY = `*[_type == "press" && _id == $id].title.current`;
const PROMO_UPDATED_QUERY = `*[_type == "promo" && _id == $id].title.current`;
const TEAMMATE_UPDATED_QUERY = `*[_type == "teammate" && _id == $id].name.current`;
const TESTIMONIAL_UPDATED_QUERY = `*[_type == "testimonial" && _id == $id].name.current`;

const getQueryForType = (type) => {
  switch (type) {
    case 'content':
      return CONTENT_UPDATED_QUERY;
    case 'legal':
      return LEGAL_UPDATED_QUERY;
    case 'partner':
      return PARTNER_UPDATED_QUERY;
    case 'post':
      return POST_UPDATED_QUERY;
    case 'press':
      return PRESS_UPDATED_QUERY;
    case 'promo':
      return PROMO_UPDATED_QUERY;
    case 'teammate':
      return TEAMMATE_UPDATED_QUERY;
    case 'testimonial':
      return TESTIMONIAL_UPDATED_QUERY;

    default:
      throw new TypeError(`Unknown type: ${type}`);
  }
};

const log = (msg, error) =>
  console[error ? 'error' : 'log'](`[revalidate] ${msg}`);

async function readBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export default async function revalidate(req, res) {
  const signature = req.headers[SIGNATURE_HEADER_NAME];
  const body = await readBody(req); // Read the body into a string
  if (
    !isValidSignature(
      body,
      signature,
      process.env.SANITY_REVALIDATE_SECRET?.trim()
    )
  ) {
    const invalidSignature = 'Invalid signature';
    log(invalidSignature, true);
    res.status(401).json({ success: false, message: invalidSignature });
    return;
  }

  const jsonBody = JSON.parse(body);
  const { _id: id, _type } = jsonBody;
  if (typeof id !== 'string' || !id) {
    const invalidId = 'Invalid _id';
    log(invalidId, true);
    return res.status(400).json({ message: invalidId });
  }

  log(`Querying post slug for _id '${id}', type '${_type}' ..`);
  const _slug = await sanityClient.fetch(getQueryForType(_type), { id });
  let staleRoutes = [];

  if (_type === 'post') {
    staleRoutes = ['/learn', `/learn/${_slug}`];
  } else if (_type === 'partner' || _type === 'legal' || _type === 'promo') {
    staleRoutes = [`/${_slug}`];
  } else if (_type === 'press') {
    staleRoutes = [`/press`];
  } else if (_type === 'teammate') {
    staleRoutes = [`/about`];
  } else if (_type === 'testimonial') {
    staleRoutes = [`/`, '/homeshares'];
  } else if (_type === 'home') {
    staleRoutes = [`/`];
  }

  try {
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)));
    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`;
    log(updatedRoutes);
    return res.status(200).json({ message: updatedRoutes });
  } catch (err) {
    log(err.message, true);
    return res.status(500).json({ message: err.message });
  }
}
