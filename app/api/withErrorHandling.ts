import { NextApiRequest, NextApiResponse } from 'next';

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const withErrorHandling = (handler: Handler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: `Something went wrong! Here is the error stack: ${error}` });
  }
};

export default withErrorHandling;