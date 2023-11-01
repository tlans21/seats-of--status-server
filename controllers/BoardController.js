const Board = require('../models/board');

exports.FreeBoard = (req, res) => {
  // GET: Retrieve all bulletin board entries
  if (req.method === 'GET') {
    Board.find({})
      .then((boards) => {
        res.json(boards); // 단일개체가 아닌 다수개체이므로 {}사용을 x 
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('An error occurred while retrieving the bulletin boards.');
      });
  }
  
  // POST: Create a new bulletin board entry
  if (req.method === 'POST') {
    const { title, description } = req.body;
    console.log(title);
    console.log(description);
    let newBoard; // newBoard 변수를 선언
    
    Board.countDocuments({})
      .then(count => {
        newBoard = new Board({
          BoardNumber: count + 1,
          title: title,
          description: description
        });
        return newBoard.save(); // newBoard.save()의 프라미스 반환
      })
      .then((board) => {
        res.json({board});
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('게시판 항목을 생성하는 중에 오류가 발생했습니다.');
      });
  }
  
  // PUT: Update a bulletin board entry
  if (req.method === 'PUT') {
    const { board_id, title, description } = req.body;
    Board.findOneAndUpdate({ _id: board_id }, { title, description })
      .then((exist) => {
        res.redirect('/freeBoard/' + exist.BoardNumber); // Use the board number in the redirect URL
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('An error occurred while updating the bulletin board entry.');
      });
  }
  
  // DELETE: Delete a bulletin board entry
  if (req.method === 'DELETE') {
    const BoardNumber = req.params.BoardNumber;
    console.log(BoardNumber);
    Board.findOneAndRemove({ BoardNumber })
      .then(() => {
        res.redirect('/freeBoard');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('An error occurred while deleting the bulletin board entry.');
      });
  }
};

exports.FreeBoards = (req, res) =>{
    const boardNumber = req.params.BoardNumber;
    console.log(boardNumber);
    // boardNumber를 기반으로 게시판 검색
    Board.findOne({ BoardNumber: boardNumber })
      .then((board) => {
        if (board) {
          // 게시판이 발견되었을 경우 처리 및 뷰에 게시판 렌더링
          console.log("OK");
          console.log({board});
          res.json({ board });
        } else {
          // 게시판을 찾지 못한 경우
          res.status(404).send('게시판을 찾을 수 없습니다.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('게시판을 검색하는 도중 오류가 발생했습니다.');
      });
}