import { createClient } from '@supabase/supabase-js';

export default async function handler(request, response) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const licenseKey = request.query.key?.toUpperCase();

  if (!licenseKey) {
    return response.status(400).send('Falta la clave de licencia');
  }

  try {
    const { data, error } = await supabase
      .from('licenses')
      .select('status')
      .eq('license_key', licenseKey)
      .single();

    if (error || !data) {
      return response.status(200).send('INVALID');
    }

    response.status(200).send(data.status.toUpperCase());

  } catch (error) {
    response.status(500).send('Error en el servidor');
  }
}
