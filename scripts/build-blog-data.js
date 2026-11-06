const fs = require('fs');
const path = require('path');

const parsed = require('../content/blogs/parsed-blogs.json');

function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/Nexohra/g, 'Claripa')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

const blogMetadata = [
  {
    blogNumber: 1,
    slug: 'hidden-cost-employee-disengagement',
    topic: 'ENGAGEMENT',
    date: 'MAY 14, 2025',
    readTime: '6 min read',
    image: '/blogs/blog-1.png',
    coverImageAlt: 'The Hidden Cost of Employee Disengagement - AI Workforce Signals',
    statsHighlight: {
      value: '$8.9T',
      label: 'Estimated annual cost of employee disengagement to the global economy (Gallup)',
    },
  },
  {
    blogNumber: 2,
    slug: 'rethinking-performance-management-ai-era',
    topic: 'AI',
    date: 'MAY 28, 2025',
    readTime: '7 min read',
    image: '/blogs/blog-2.jpg',
    coverImageAlt: 'Rethinking Performance Management in the AI Era',
    statsHighlight: {
      value: '365 Days',
      label: 'Continuous performance intelligence replacing once-a-year review cycles',
    },
  },
  {
    blogNumber: 3,
    slug: 'onboarding-reimagined-predictive-assimilation',
    topic: 'ONBOARDING',
    date: 'JUN 10, 2025',
    readTime: '5 min read',
    image: '/blogs/blog-3.jpg',
    coverImageAlt: 'Onboarding Reimagined: The Strategic ROI of Predictive Assimilation',
    statsHighlight: {
      value: '20%',
      label: 'Of employee turnover occurs within the first 45 days of joining',
    },
  },
  {
    blogNumber: 4,
    slug: 'unlocking-workforce-potential-skill-adjacency',
    topic: 'ANALYTICS',
    date: 'JUN 24, 2025',
    readTime: '6 min read',
    image: '/blogs/blog-4.jpg',
    coverImageAlt: 'Unlocking Workforce Potential through Skill Adjacency',
    statsHighlight: {
      value: '1.4x',
      label: 'Faster time-to-productivity when reskilling through adjacent capabilities',
    },
  },
  {
    blogNumber: 5,
    slug: 'attrition-algorithm-predicting-flight-risk',
    topic: 'ATTRITION',
    date: 'JUL 08, 2025',
    readTime: '6 min read',
    image: '/blogs/blog-5.jpg',
    coverImageAlt: 'The Attrition Algorithm: Predicting Flight Risk Before It Hits the Bottom Line',
    statsHighlight: {
      value: '1-2x',
      label: 'Annual salary cost of replacing a departing manager or technical specialist',
    },
  },
  {
    blogNumber: 6,
    slug: 'managers-untapped-workforce-intelligence',
    topic: 'ENGAGEMENT',
    date: 'JUL 22, 2025',
    readTime: '7 min read',
    image: '/blogs/blog-6.jpg',
    coverImageAlt: 'Why Your Managers Are Your Most Untapped Source of Workforce Intelligence',
    statsHighlight: {
      value: '70%',
      label: 'Of the variance in team engagement is attributable to direct managers (Gallup)',
    },
  },
];

const blogs = parsed.map((rawBlog, idx) => {
  const meta = blogMetadata[idx];
  const pList = rawBlog.paragraphs;
  
  const title = cleanText(pList[0].text);
  
  // Find key takeaways
  const keyTakeaways = [];
  let pIdx = 1;
  while (pIdx < pList.length) {
    const text = cleanText(pList[pIdx].text);
    if (text.toLowerCase() === 'key takeaways') {
      pIdx++;
      while (pIdx < pList.length && (pList[pIdx].isBullet || pList[pIdx].text.startsWith('•') || pList[pIdx].text.startsWith('-'))) {
        keyTakeaways.push(cleanText(pList[pIdx].text.replace(/^[•\-]\s*/, '')));
        pIdx++;
      }
      break;
    }
    pIdx++;
  }

  // Next non-empty paragraph is the excerpt / intro
  let excerpt = '';
  while (pIdx < pList.length && !excerpt) {
    const t = cleanText(pList[pIdx].text);
    if (t && t.length > 40 && !t.startsWith('Talk to Us') && !t.startsWith('Book a Demo')) {
      excerpt = t;
    }
    pIdx++;
  }

  const sections = [];
  let currentSection = {
    id: 'overview',
    title: 'Overview',
    blocks: [{ type: 'paragraph', text: excerpt }]
  };

  while (pIdx < pList.length) {
    const p = pList[pIdx];
    const text = cleanText(p.text);
    pIdx++;

    if (!text || text.startsWith('Talk to Us') || text.startsWith('Book a Demo |') || text.startsWith('Explore Our Product')) {
      continue;
    }

    // Special check for comparison table in Blog 2
    if (text === 'Traditional Performance Reviews' && pIdx < pList.length && cleanText(pList[pIdx].text) === 'AI-Driven Performance Intelligence') {
      const header1 = text;
      const header2 = cleanText(pList[pIdx].text);
      pIdx++; // skip header2
      
      const rows = [];
      while (pIdx < pList.length - 1) {
        const col1 = cleanText(pList[pIdx].text);
        const col2 = cleanText(pList[pIdx + 1].text);
        if (col1.startsWith('3 shifts') || col1.startsWith('What Performance') || pList[pIdx].isHeading1 || pList[pIdx].isHeading2) {
          break;
        }
        rows.push([col1, col2]);
        pIdx += 2;
      }
      
      currentSection.blocks.push({
        type: 'comparison-table',
        table: {
          headers: [header1, header2],
          rows
        }
      });
      continue;
    }

    // Check if this paragraph is a section header
    const isHeader = (
      p.isHeading1 || 
      p.isHeading2 || 
      p.isHeading3 || 
      (!p.isBullet && text.length < 65 && !text.endsWith('.') && !text.endsWith(';') && !text.endsWith(','))
    );

    if (isHeader) {
      if (currentSection.blocks.length > 0) {
        sections.push(currentSection);
      }
      currentSection = {
        id: slugify(text) || `section-${sections.length + 1}`,
        title: text,
        blocks: []
      };
      continue;
    }

    // Handle bullet items
    if (p.isBullet || text.startsWith('•') || text.startsWith('-')) {
      const cleanBullet = text.replace(/^[•\-]\s*/, '');
      const lastBlock = currentSection.blocks[currentSection.blocks.length - 1];
      if (lastBlock && lastBlock.type === 'bullet-list') {
        lastBlock.items.push(cleanBullet);
      } else {
        currentSection.blocks.push({
          type: 'bullet-list',
          items: [cleanBullet]
        });
      }
      continue;
    }

    // Standard paragraph
    currentSection.blocks.push({
      type: 'paragraph',
      text
    });
  }

  if (currentSection.blocks.length > 0) {
    sections.push(currentSection);
  }

  return {
    id: `blog-${meta.blogNumber}`,
    slug: meta.slug,
    blogNumber: meta.blogNumber,
    title,
    subtitle: excerpt,
    category: 'BLOGS',
    topic: meta.topic,
    date: meta.date,
    readTime: meta.readTime,
    author: {
      name: 'Claripa Intelligence Team',
      role: 'Workforce Research & Strategy',
      avatar: '/team.jpg',
    },
    image: meta.image,
    coverImageAlt: meta.coverImageAlt,
    keyTakeaways,
    statsHighlight: meta.statsHighlight,
    sections,
  };
});

const tsContent = `// Auto-generated blog dataset for Claripa Insights
export interface BlogContentBlock {
  type: "paragraph" | "heading" | "subheading" | "bullet-list" | "comparison-table" | "quote" | "stat";
  text?: string;
  items?: string[];
  stat?: { value: string; label: string };
  quote?: { text: string; author?: string };
  table?: {
    headers: [string, string];
    rows: [string, string][];
  };
}

export interface BlogSection {
  id: string;
  title: string;
  blocks: BlogContentBlock[];
}

export interface BlogPost {
  id: string;
  slug: string;
  blogNumber: number;
  title: string;
  subtitle: string;
  category: string;
  topic: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  coverImageAlt: string;
  keyTakeaways: string[];
  statsHighlight?: {
    value: string;
    label: string;
  };
  sections: BlogSection[];
}

export const allBlogs: BlogPost[] = ${JSON.stringify(blogs, null, 2)};

export function getAllBlogs(): BlogPost[] {
  return allBlogs;
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return allBlogs.find((b) => b.slug === slug || b.id === slug);
}

export function getRelatedBlogs(currentSlug: string, count = 3): BlogPost[] {
  return allBlogs.filter((b) => b.slug !== currentSlug && b.id !== currentSlug).slice(0, count);
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'data', 'blogs.ts'), tsContent, 'utf8');
console.log('Successfully regenerated data/blogs.ts with rich comparison table');
