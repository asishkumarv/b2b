import { useState, useEffect } from 'react';
import axios from 'axios';

// We store the content in a module-level variable to cache it 
// so we don't refetch on every page navigation
let cachedContent = null;
let isFetching = false;
let fetchPromise = null;
let loadingListeners = [];

export const useIsContentLoading = () => {
  const [loading, setLoading] = useState(!cachedContent);
  useEffect(() => {
    if (cachedContent) return;
    const listener = (state) => setLoading(state);
    loadingListeners.push(listener);
    return () => { loadingListeners = loadingListeners.filter(l => l !== listener); };
  }, []);
  return loading;
};

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
          if (!isFetching) {
            isFetching = true;
            loadingListeners.forEach(l => l(true));
            fetchPromise = axios.get('https://api.b2bwebsolutions.com/api/content');
            const res = await fetchPromise;
            
            // Convert array of content into a dictionary object for O(1) lookups
            cachedContent = res.data.reduce((acc, item) => {
              acc[item.pageKey] = item;
              return acc;
            }, {});
            
            isFetching = false;
            loadingListeners.forEach(l => l(false));
          } else if (fetchPromise) {
            await fetchPromise;
          }
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
        isFetching = false;
        loadingListeners.forEach(l => l(false));
      }
    };

    fetchContent();
  }, [pageKey, defaultTitle, defaultDescription, defaultImageUrl]); // Removed defaultData

  return content;
};
