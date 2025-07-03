const { z } = require('zod');

const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|m\.youtube\.com\/watch\?v=)[\w-]+(&\S*)?$/;

const submissionSchema = z.object({
  url: z.string()
    .min(1, '请输入YouTube链接')
    .regex(youtubeUrlRegex, '请输入有效的YouTube链接'),
  email: z.string()
    .min(1, '请输入邮箱地址')
    .email('请输入有效的邮箱地址')
});

function validateSubmission(data) {
  try {
    return submissionSchema.parse(data);
  } catch (error) {
    throw new Error(error.errors[0].message);
  }
}

function isValidYouTubeUrl(url) {
  return youtubeUrlRegex.test(url);
}

module.exports = {
  validateSubmission,
  isValidYouTubeUrl,
  submissionSchema
};