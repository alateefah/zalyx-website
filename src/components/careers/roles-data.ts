import type { Role } from './RoleCard';

export const ROLES: Role[] = [
  {
    title: 'Growth Marketing & Partnerships Officer',
    type: 'Full-Time',
    locations: ['Lagos', 'Rivers', 'Kano', 'Abuja'],
    summary:
      'Drive merchant adoption across Nigeria through field marketing, community partnerships, and onboarding. Work directly with business associations and communities.',
    open: false,
    overview:
      "This role combines field marketing, community partnerships, merchant onboarding, and retention. You'll work directly with business communities to introduce Zalyx, run demos, onboard merchants, and ensure they become active users.",
    responsibilitiesHeading: 'Key responsibilities',
    responsibilities: [
      {
        title: 'Merchant acquisition',
        body: 'Identify and engage business communities and associations including market groups, trade unions, mechanics associations, and small business clusters. Build relationships with association leaders and organize group onboarding sessions.',
      },
      {
        title: 'Partnerships & community growth',
        body: 'Develop partnerships with trade associations, cooperative groups, and business clusters. Host Zalyx demo sessions and onboarding events to drive merchant signups.',
      },
      {
        title: 'Merchant onboarding',
        body: 'Guide new merchants through installing the app, setting up their profile, adding their first customers, and recording their first transactions. Ensure merchants reach activation milestones quickly.',
      },
      {
        title: 'Merchant activation',
        body: 'An activated merchant has signed up, added at least one customer, recorded their first transaction, and shared their referral code. You are responsible for getting signups to activation fast.',
      },
      {
        title: 'Retention & engagement',
        body: 'Follow up with inactive merchants, understand friction points, and help them unlock value from the platform. Document feedback for the product team.',
      },
      {
        title: 'Field demos & events',
        body: 'Organize and attend live demos and onboarding sessions at markets, association meetings, and community events. This includes representing Zalyx at business and tech events in your state.',
      },
      {
        title: 'Merchant feedback loop',
        body: 'Act as the bridge between users and the product team. Gather feedback on friction, feature requests, and usage patterns to help shape product improvements.',
      },
    ],
    compensationHeading: 'Compensation',
    compensation: [
      { label: 'Monthly base', value: '₦100,000' },
      { label: 'Performance bonus', value: '+ targets' },
    ],
    whoItsFor: [
      'Comfortable speaking with business owners',
      'Experience in marketing, sales, or community roles',
      'Proactive and independent in the field',
      'Able to build relationships with community leaders',
      'Passionate about helping small businesses',
      'Fintech or startup experience is a plus',
    ],
    extra: {
      heading: 'Why join Zalyx',
      items: [
        'Early-stage startup solving a real problem',
        'Work directly with business owners',
        'Performance bonus for hitting targets',
        'Make a real impact on how businesses operate',
      ],
    },
    applyHref: 'https://forms.gle/1WSxarrz2LAZpYxW9',
  },
  {
    title: 'Field Onboarding Partner',
    type: 'Commission-Based',
    locations: ['Lagos'],
    summary:
      'Help small business owners install and activate Zalyx Ledger across Lagos markets and shops. Earn per verified activation.',
    open: false,
    overview:
      "Zalyx Ledger is a mobile app that helps small business owners track customers and debts. We're looking for field partners to help onboard artisans such as tailors, mechanics, shop owners, and dispatch riders across Lagos.",
    responsibilitiesHeading: "What you'll do",
    responsibilities: [
      { body: 'Visit markets and shops around Lagos' },
      { body: 'Help merchants install the Zalyx app' },
      { body: 'Guide them to add their first customer and first order' },
      { body: 'Ensure the merchant understands how to track money owed' },
    ],
    successCriteria: [
      'The merchant has the app installed',
      "They've added at least one customer",
      "They've created at least one order",
      'A balance owed is recorded in the app',
    ],
    compensationHeading: 'Commission & incentives',
    compensation: [
      { label: 'Per activation', value: '₦2,000' },
      { label: 'Weekly bonus (25+ activations)', value: '₦10,000' },
      { label: 'Payout schedule', value: 'Weekly' },
    ],
    whoItsFor: [
      'Based in Lagos or able to move around Lagos',
      'Comfortable talking to business owners',
      'Speaks English and Yoruba or Pidgin',
      'Has a smartphone and mobile data',
      'Field sales experience is a plus (not required)',
    ],
    extra: {
      heading: 'What we provide',
      items: [
        'Short training and onboarding session',
        'Clear activation checklist',
        'Demo guidance and support',
        'WhatsApp support channel',
      ],
    },
    // The old field-onboarding-partner page never had a public form link —
    // it only ever showed the closed notice. Mailto is the honest fallback
    // rather than reusing the other role's form.
    applyHref: 'mailto:careers@zalyx.io?subject=Field%20Onboarding%20Partner',
  },
];
