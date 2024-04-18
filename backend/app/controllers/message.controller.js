const ApiError = require("../api-error");
const messageService = require("../services/message.service");
const userService = require("../services/user.service");

const multer = require('multer');
function getCurrentDateTimeString() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString();
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');

  return `${day}-${month}-${year}-${hour}-${minute}`;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const dateTimeString = getCurrentDateTimeString(); 
    const originalname = file.originalname; 
    cb(null, dateTimeString + '-' + originalname); 
  }
});

const upload = multer({ storage: storage });

exports.createMessage = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await userService.findById(id);

    const userid = id;
    let _data;
    if (req.body.loai === 'van_ban') {
      _data = {
        loai: req.body.loai,
        userid,
        name: user.name,
        text: req.body.text,
        groupid: req.body.groupid,
        createdAt: new Date(),
      };
    } else  if (req.body.loai === 'hinh_anh')  {
      _data = {
        loai: req.body.loai,
        userid,
        name: user.name,
        fileName: Date.now() + '-' + req.body.fileName,
        groupid: req.body.groupid,
        createdAt: new Date(),
      };
    
    } else  if (req.body.loai === 'tep')  {
      _data = {
        loai: req.body.loai,
        userid,
        name: user.name,
        fileName: Date.now() + '-' + req.body.fileName,
        groupid: req.body.groupid,
        createdAt: new Date(),
      };
    }
   const result = await messageService.createMessage(_data);
    return res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo tin nhắn", 500));
  }
};

exports.createMessageImg = [
  upload.single('image'),

  async (req, res, next) => {
    try {
      const user = await userService.findById(req.body.userid);

      const dateTimeString = getCurrentDateTimeString();
      const _data = {
        loai: req.body.loai,
        userid: req.body.userid,
        name: user.name,
        fileName: dateTimeString  + '-' + req.body.fileName, 
        groupid: req.body.groupid,
        createdAt: new Date(),
      };
    
   const result = await messageService.createMessage(_data);
      return res.send(result);
    } catch (error) {
      next(new ApiError("Lỗi tạo tin nhắn hình ảnh", 500));
    }
  }
];
exports.createMessageFile = [
  upload.single('file'),

  async (req, res, next) => {
    try {
      const user = await userService.findById(req.body.userid);

      const dateTimeString = getCurrentDateTimeString();
      const _data = {
        loai: req.body.loai,
        userid: req.body.userid,
        name: user.name,
        fileName: dateTimeString  + '-' + req.body.fileName, // Sử dụng currentTime ở đây
        groupid: req.body.groupid,
        createdAt: new Date(),
      };
    
   const result = await messageService.createMessage(_data);
      return res.send(result);
    } catch (error) {
      next(new ApiError("Lỗi tạo tin nhắn hình ảnh", 500));
    }
  }
];

exports.createGroup = async (req, res, next) => {
  try {
    const _data = {
      ...req.body,
      createdAt: new Date(),
    };

    const result = await messageService.createGroup(_data);
    return res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo nhóm", 500));
  }
};
exports.getMyGroups = async (req, res, next) => {
  const { id } = req.user;
  try {
    const result = await messageService.getMyGroups(id);
    return res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo bình luận", 500));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  const { groupid } = req.params
  try {
    documents = await messageService.findAll(groupid);
  } catch (error) {
    next(new ApiError("An error occurred while retrieving messages", 500));
  }
  return res.send(documents);
};

exports.findOneBySlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const document = await messageService.findBySlug(slug);
    if (!document) {
      return next(new ApiError(`Message with slug ${slug} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving message ${slug}`, 500));
  }
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await messageService.findById(id);
    if (!document) {
      return next(new ApiError(`Message with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving message ${id}`, 500));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError("Update data cannot be empty", 400));
  }
  const { id } = req.params;
  const _data = {

  };
  try {
    const document = await messageService.update(id, _data);
    if (!document) {
      return next(new ApiError(`Message with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating message ${id}`, 500));
  }
};

exports.deleteMessage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await messageService.deleteOne(id);
    if (!document) {
      return next(new ApiError(`Message with id ${id} not found`, 404));
    }
    return res.send({
      message: `Message with id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting message ${id}`, 500));
  }
};

exports.deleteAllMessages = async (req, res, next) => {
  try {
    const result = await messageService.deleteAll();
    return res.send({
      message: `${result.deletedCount} messages were deleted successfully`,
    });
  } catch (error) {
    next(new ApiError("An error accurred while deleting messages", 500));
  }
};