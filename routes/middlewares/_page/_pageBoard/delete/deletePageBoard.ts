import { NextFunction, Request, Response } from 'express'; 

import PageBoard from '@Model/pageBoard.model';

const deletePageBoard = async (req: Request, res: Response, next: NextFunction) => {
  const pageBoard_pk: PageBoard['pk'] = req.query.pageBoard_pk;

  try {
    const pageBoard: PageBoard = await PageBoard.findOne({
      where: {
        pk: pageBoard_pk,
      },
    });

    if(pageBoard){
      const result = await PageBoard.destroy({
        where: {
          pk: pageBoard_pk,
        },
      });

      if(result) {
        res.status(500).json({
          success: false,
          message: 'DB error',
        });
      } else {
        res.status(200).json({
          success: true,
          message: '페이지 작성글이 성공적으로 삭제되었습니다',
        });
      }
      
    }
  } catch(err) {
    console.log(err);
    res.status(412).json({
      success: false,
      message: '잘못된 요청데이터입니다.',
    })
  }
}

export default deletePageBoard;