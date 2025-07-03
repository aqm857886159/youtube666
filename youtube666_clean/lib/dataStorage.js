const fs = require('fs');
const path = require('path');

const CSV_FILE = path.join(process.cwd(), 'data', 'submissions.csv');

// 确保数据目录存在
const dataDir = path.dirname(CSV_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 确保CSV文件存在，如果不存在则创建
if (!fs.existsSync(CSV_FILE)) {
  fs.writeFileSync(CSV_FILE, 'url,email,timestamp\n');
}

function saveSubmission(url, email) {
  const timestamp = new Date().toISOString();
  const line = `"${url}","${email}","${timestamp}"\n`;
  
  fs.appendFileSync(CSV_FILE, line);
  
  return { url, email, timestamp };
}

function getAllSubmissions() {
  try {
    const content = fs.readFileSync(CSV_FILE, 'utf8');
    const lines = content.trim().split('\n');
    const header = lines[0];
    const data = lines.slice(1);
    
    return data.map(line => {
      const [url, email, timestamp] = line.split(',').map(field => 
        field.replace(/^"(.*)"$/, '$1')
      );
      return { url, email, timestamp };
    });
  } catch (error) {
    return [];
  }
}

function getSubmissionCount() {
  const submissions = getAllSubmissions();
  return submissions.length;
}

module.exports = {
  saveSubmission,
  getAllSubmissions,
  getSubmissionCount
};