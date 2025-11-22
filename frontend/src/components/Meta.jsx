import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Ecoland | Premium Organic Products Online',
  description:
    'Join the organic movement with Ecoland. Shop certified organic spices, cashews, turmeric, and more. 100% guaranteed quality, free shipping above ₹500, and easy returns. Best quality organic products at lowest prices.',
  keywords:
    'organic products, organic spices, organic cashews, organic turmeric, organic black pepper, certified organic, natural products, healthy food, ecoland, organic shopping, chemical-free products, premium organic'
};

export default Meta;