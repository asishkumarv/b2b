import { useState, useEffect } from 'react';
import axios from 'axios';

// We store the content in a module-level variable to cache it 
// so we don't refetch on every page navigation
let cachedContent = null;

export const usePageContent = (pageKey, defaultTitle, defaultDescription, defaultData = null, defaultImageUrl = '') => {
  const [content, setContent] = useState({
    title: defaultTitle,
    description: defaultDescription,
    data: defaultData,
    imageUrl: defaultImageUrl
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (!cachedContent) {
          const res = await axios.get('https://b2b-yyfo.onrender.com/api/content');
          // Convert array of content into a dictionary object for O(1) lookups
          cachedContent = res.data.reduce((acc, item) => {
            acc[item.pageKey] = item;
            return acc;
          }, {});
        }

        if (cachedContent && cachedContent[pageKey]) {
          setContent({
            title: cachedContent[pageKey].title || defaultTitle,
            description: cachedContent[pageKey].description || defaultDescription,
            data: cachedContent[pageKey].data || defaultData,
            imageUrl: cachedContent[pageKey].imageUrl || defaultImageUrl
          });
        }
      } catch (err) {
        console.error('Failed to fetch page content from backend', err);
      }
    };

    fetchContent();
  }, [pageKey, defaultTitle, defaultDescription, defaultData, defaultImageUrl]);

  return content;
};
