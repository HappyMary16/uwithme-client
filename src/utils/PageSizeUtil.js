export const isPageSmall = () => {
  return document.body.scrollWidth < 500;
};

export const isPageTiny = () => {
  return document.body.scrollWidth < 350;
};

export const isPageSmallForSchedule = () => {
  return document.body.scrollWidth < 800;
};
