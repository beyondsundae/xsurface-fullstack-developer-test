import { NextApiRequest, NextApiResponse } from 'next'
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb' // Adjust this value as needed
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // If you don't need to send data to a url, you can make a no-op api route that simply returns a success, and then pointed Ant Design <Upload>'s action to /api/noop

  res.status(200).end('noop')
}
