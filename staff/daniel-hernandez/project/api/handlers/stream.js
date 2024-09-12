import services from '../services/index.js';

const stream = async (req, res, next) => {
   const { id: userId } = req.user;
   const { trackId } = req.params;
   const { range } = req.body;

   try {
      const { stream, contentType, contentLength, contentRange } = await services.stream(userId, trackId, range);

      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Length', contentLength);
      res.setHeader('Content-Range', contentRange);
      res.setHeader('Accept-Ranges', 'bytes');
      res.status(range ? 206 : 200);

      stream.pipe(res);
   } catch (error) {
      next(error);
   }
};

export default stream;
