export const setMetaTags = (description, title) => {
    const metaDescription = document.createElement('meta');
    metaDescription.setAttribute('property', 'og:description');
    metaDescription.content = description;
    document.getElementsByTagName('head')[0].appendChild(metaDescription);
  
    const metaTitle = document.createElement('meta');
    metaTitle.setAttribute('property', 'og:title');
    metaTitle.content = title;
    document.getElementsByTagName('head')[0].appendChild(metaTitle);
  
    const twitterTitle = document.createElement('meta');
    twitterTitle.setAttribute('property', 'twitter:title');
    twitterTitle.content = title;
    document.getElementsByTagName('head')[0].appendChild(twitterTitle);
  
    const twitterDescription = document.createElement('meta');
    twitterDescription.setAttribute('property', 'twitter:description');
    twitterDescription.content = description;
    document.getElementsByTagName('head')[0].appendChild(twitterDescription);
  }
  