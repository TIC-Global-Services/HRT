const fs = require('fs');
const path = require('path');

const blogs = [];

for (let i = 1; i <= 6; i++) {
  const xmlPath = path.join(__dirname, '..', 'content', 'blogs', 'extracted', `Blog${i}`, 'word', 'document.xml');
  if (!fs.existsSync(xmlPath)) continue;
  const xml = fs.readFileSync(xmlPath, 'utf8');

  const pRegex = /<w:p(?:\s[^>]*)?>([\s\S]*?)<\/w:p>/g;
  let pMatch;
  const paragraphs = [];

  while ((pMatch = pRegex.exec(xml)) !== null) {
    const pContent = pMatch[1];
    
    // Check if heading or list or bold
    const isHeading1 = /val=["']Heading1["']/i.test(pContent) || /val=["']Title["']/i.test(pContent);
    const isHeading2 = /val=["']Heading2["']/i.test(pContent);
    const isHeading3 = /val=["']Heading3["']/i.test(pContent);
    const isBullet = /<w:numPr>/i.test(pContent);
    
    // Extract runs with bold formatting
    const rRegex = /<w:r(?:\s[^>]*)?>([\s\S]*?)<\/w:r>/g;
    let rMatch;
    let runs = [];
    let pText = '';
    
    while ((rMatch = rRegex.exec(pContent)) !== null) {
      const rContent = rMatch[1];
      const isBold = /<w:b(?:\s[^>]*)?\/>|<w:b\s+[^>]*w:val=["'](?:1|true)["']/i.test(rContent);
      const isItalic = /<w:i(?:\s[^>]*)?\/>|<w:i\s+[^>]*w:val=["'](?:1|true)["']/i.test(rContent);
      
      const tRegex = /<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g;
      let tMatch;
      let rText = '';
      while ((tMatch = tRegex.exec(rContent)) !== null) {
        rText += tMatch[1];
      }
      if (rText) {
        runs.push({ text: rText, bold: isBold, italic: isItalic });
        pText += rText;
      }
    }
    
    pText = pText.trim();
    if (pText) {
      paragraphs.push({
        text: pText,
        runs,
        isHeading1,
        isHeading2,
        isHeading3,
        isBullet
      });
    }
  }

  blogs.push({
    blogNumber: i,
    paragraphCount: paragraphs.length,
    paragraphs
  });
}

fs.writeFileSync(path.join(__dirname, '..', 'content', 'blogs', 'parsed-blogs.json'), JSON.stringify(blogs, null, 2));
console.log('Successfully parsed', blogs.length, 'blogs');
blogs.forEach(b => {
  console.log(`\nBlog ${b.blogNumber}: ${b.paragraphCount} paragraphs`);
  console.log('Title/Heading:', b.paragraphs[0]?.text);
  if (b.paragraphs[1]) console.log('Sub:', b.paragraphs[1]?.text);
});

