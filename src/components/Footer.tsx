export default function Footer() {
  const quickLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ];

  const contactDetails = [
    { label: "support@zalyx.io", href: "mailto:support@zalyx.io" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/zalyx/",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 
          2.761 2.239 5 5 5h14c2.761 0 5-2.239 
          5-5V5c0-2.761-2.239-5-5-5zM8 19H5V8h3v11zM6.5 
          6.732c-.966 0-1.75-.79-1.75-1.764S5.534 
          3.204 6.5 3.204s1.75.79 1.75 1.764S7.466 
          6.732 6.5 6.732zM19 19h-3v-5.604c0-3.368-4-3.113-4 
          0V19h-3V8h3v1.765C13.396 7.179 19 6.988 19 
          12.241V19z"/>
        </svg>
      ),
    },
    {
      name: "X",
      href: "https://x.com/zalyxtech",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 
          8.502 11.24H16.17l-5.214-6.817L4.99 
          21.75H1.68l7.73-8.835L1.254 
          2.25H8.08l4.713 6.231zm-1.161 
          17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/zalyx.io",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 
          4.85.07 3.252.148 4.771 1.691 
          4.919 4.919.058 1.265.069 1.645.069 
          4.849 0 3.205-.012 3.584-.069 
          4.849-.149 3.225-1.664 
          4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 
          0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 
          0-3.204.013-3.583.07-4.849.149-3.227 
          1.664-4.771 4.919-4.919C8.417 
          2.175 8.796 2.163 12 
          2.163zm0 3.675c-3.403 
          0-6.162 2.759-6.162 6.162S8.597 
          18.162 12 18.162s6.162-2.759 
          6.162-6.162S15.403 5.838 12 
          5.838z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full py-20 md:py-32 px-6 md:px-16 bg-[#0b0d13] text-white relative">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* LOGO + COMPANY INFO */}
          <div className="lg:col-span-2">
            <img src="/zalyx-logo.png" alt="Zalyx Logo" className="h-12 w-auto mb-6" />
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Zalyx Ledger is a company duly registered with RC Number: 9014239 under the Laws of the Federal Republic of Nigeria.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-6">Contact</h4>
            <ul className="space-y-4">
              {contactDetails.map((contact, index) => (
                <li key={index}>
                  <a 
                    href={contact.href}
                    className="text-gray-400 text-sm hover:text-white transition"
                  >
                    {contact.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gray-700 mb-6" />

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">
            © 2025 Zalyx Technologies. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1e2334] text-gray-300 hover:text-white hover:bg-[#2a3042] transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
