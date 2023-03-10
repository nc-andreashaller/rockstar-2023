import defaults from './defaults';

export const environment = {
  ...defaults,
  production: true,
  apis: {
    structure: 'https://publish-p97903-e990869.adobeaemcloud.com/apps/rockstar-2023/services/structure.public.json{path}',
    content: 'https://publish-p97903-e990869.adobeaemcloud.com/apps/rockstar-2023/services/content.public.html{path}',
    teaserList: 'https://publish-p97903-e990869.adobeaemcloud.com/apps/rockstar-2023/services/teaser-list.public.json{path}',
  },
};
