'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { Button3D } from '@/components/ui/Button3D';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  Truck,
  ArrowRight
} from 'lucide-react';

export default function ContactPage() {
  const { language, t } = useLanguage();

  const content = {
    en: {
      badge: 'Customer Care & Inquiries',
      title: 'Contact Us & Customer Support',
      subtitle: 'We are here to assist you with product questions, dosage recommendations, and order status updates.',
      tagline: 'CUSTOMER HELPLINE • 24-HOUR RESPONSE • PAN-INDIA SUPPORT',
      formTitle: 'Send Us a Message',
      formSubtitle: 'Fill out the form below and our customer support team will get in touch with you within 24 hours.',
      fullName: 'Full Name',
      namePlaceholder: 'e.g. Rahul Sharma',
      mobile: 'Mobile Number',
      mobilePlaceholder: '98765 43210',
      email: 'Email Address (Optional)',
      emailPlaceholder: 'you@email.com',
      city: 'City & Pincode',
      cityPlaceholder: 'e.g. New Delhi, 110001',
      topic: 'Topic / Product Category',
      message: 'Your Message / Inquiry',
      messagePlaceholder: 'Please describe your health query, order question, or product details...',
      privacyNotice: 'Your inquiry and personal details are always kept strictly private and safe.',
      submitBtn: 'Send Message',
      submittingBtn: 'Sending Your Message...',
      successTitle: 'Message Received Successfully!',
      successSubtitle: 'Thank you for reaching out to us.',
      tokenLabel: 'Inquiry Reference ID:',
      phoneLabel: 'Contact Phone:',
      reviewTimeLabel: 'Estimated Response Time:',
      reviewTimeValue: 'Within 24 Business Hours',
      successNote: 'Our customer support team has received your inquiry. We will contact you via phone or SMS shortly.',
      newInquiryBtn: 'Send Another Message',
      shopBtn: 'Shop Products',
      helpdeskTitle: 'Customer Support Desk',
      helplineLabel: 'Phone Helpline',
      helplineValue: '+91 Verified Support Desk',
      helplineHours: 'Monday to Saturday: 9:00 AM – 8:00 PM IST',
      emailLabel: 'Email Support',
      emailValue: 'care@ifaqaremedies.com',
      emailNote: 'We reply to emails within 24 business hours.',
      addressLabel: 'Dispensary Office',
      addressValue: 'IFAQA Herbal Remedies, Registered Dawakhana, India',
      addressNote: 'Delivering to 19,000+ pincodes across all Indian states.',
      speedTitle: 'Estimated Delivery Times',
      metroSpeed: 'Metro Cities (Delhi, Mumbai, Bengaluru): 1 – 2 Days',
      tierSpeed: 'Other Cities & Regional Districts: 2 – 4 Days',
      remoteSpeed: 'Hill Stations & Remote Pincodes: 4 – 6 Days',
      intlSpeed: 'International Express Courier: 5 – 8 Days',
      faqTitle: 'Frequently Asked Questions',
      faq1Q: 'How do I choose the right herbal product?',
      faq1A: 'You can browse our website by health category (Digestion, Vitality, Cough & Cold, Joint Care) or send us a message above for personalized product guidance.',
      faq2Q: 'How long will delivery take?',
      faq2A: 'Orders are dispatched within 24 hours. Metros take 1 to 2 days, and other cities take 2 to 4 business days.',
      faq3Q: 'Is my consultation and health query private?',
      faq3A: 'Yes, 100%. All customer health queries and details are strictly confidential and never shared with third parties.',
      faq4Q: 'How can I track my order?',
      faq4A: 'Once your order is dispatched, you will receive an SMS with a live courier tracking link to track your package.',
      ctaTitle: 'Need Immediate Product Advice?',
      ctaSubtitle: 'Call our customer helpline directly or explore our complete catalog of natural herbal remedies.',
    },
    hi: {
      badge: 'कस्टमर केयर एवं सहायता',
      title: 'हमसे संपर्क करें (Customer Support)',
      subtitle: 'उत्पाद की जानकारी, सही खुराक या ऑर्डर से जुड़े किसी भी सवाल के लिए हमारी टीम आपकी सेवा में हाज़िर है।',
      tagline: 'हेल्पलाइन • 24 घंटे में समाधान • पूरे भारत में सहायता',
      formTitle: 'हमें संदेश भेजें',
      formSubtitle: 'नीचे दिया गया फ़ॉर्म भरें, हमारी कस्टमर केयर टीम 24 घंटे के भीतर आपसे संपर्क करेगी।',
      fullName: 'पूरा नाम',
      namePlaceholder: 'उदा. राहुल शर्मा',
      mobile: 'मोबाइल नंबर',
      mobilePlaceholder: '98765 43210',
      email: 'ईमेल आईडी (वैकल्पिक)',
      emailPlaceholder: 'you@email.com',
      city: 'शहर एवं पिनकोड',
      cityPlaceholder: 'उदा. नई दिल्ली, 110001',
      topic: 'समस्या या उत्पाद की श्रेणी',
      message: 'आपका सवाल या संदेश',
      messagePlaceholder: 'अपनी स्वास्थ्य समस्या, आवश्यक दवा या आर्डर से जुड़ा सवाल विस्तार से लिखें...',
      privacyNotice: 'आपकी जानकारी हमेशा सुरक्षित और पूरी तरह गोपनीय रखी जाती है।',
      submitBtn: 'संदेश भेजें',
      submittingBtn: 'संदेश भेजा जा रहा है...',
      successTitle: 'संदेश सफलतापूर्वक प्राप्त हुआ!',
      successSubtitle: 'हमसे संपर्क करने के लिए धन्यवाद।',
      tokenLabel: 'इन्क्वायरी रेफरेंस नंबर:',
      phoneLabel: 'संपर्क मोबाइल:',
      reviewTimeLabel: 'अनुमानित संपर्क समय:',
      reviewTimeValue: '24 कार्य घंटों के भीतर',
      successNote: 'हमारी टीम को आपका सवाल मिल चुका है। हमारे विशेषज्ञ जल्द ही कॉल या व्हाट्सएप द्वारा आपसे संपर्क करेंगे।',
      newInquiryBtn: 'एक और संदेश भेजें',
      shopBtn: 'दवाइयां एवं उत्पाद देखें',
      helpdeskTitle: 'कस्टमर केयर डेस्क',
      helplineLabel: 'फ़ोन हेल्पलाइन',
      helplineValue: '+91 सत्यापित सपोर्ट डेस्क',
      helplineHours: 'सोमवार से शनिवार: सुबह 9:00 से रात 8:00 बजे तक',
      emailLabel: 'ईमेल सपोर्ट',
      emailValue: 'care@ifaqaremedies.com',
      emailNote: 'ईमेल का उत्तर 24 घंटे के अंदर दिया जाता है।',
      addressLabel: 'कार्यालय व डिस्पेंसरी',
      addressValue: 'IFAQA हर्बल रेमेडीज़, रजिस्टर्ड दवाखाना, भारत',
      addressNote: 'भारत के 19,000+ पिनकोड पर तेज़ डिलीवरी उपलब्ध।',
      speedTitle: 'डिलीवरी में लगने वाला समय',
      metroSpeed: 'मेट्रो शहर (दिल्ली, मुंबई, बेंगलुरु): 1 – 2 दिन',
      tierSpeed: 'अन्य प्रमुख शहर एवं जिले: 2 – 4 दिन',
      remoteSpeed: 'पहाड़ी एवं दूरदराज के क्षेत्र: 4 – 6 दिन',
      intlSpeed: 'अंतर्राष्ट्रीय एक्सप्रेस कूरियर: 5 – 8 दिन',
      faqTitle: 'अक्सर पूछे जाने वाले सवाल (FAQ)',
      faq1Q: 'सही हर्बल दवा का चुनाव कैसे करें?',
      faq1A: 'आप हमारी वेबसाइट पर कैटेगरी (पाचन, शक्ति, खांसी, जोड़ों का दर्द) के अनुसार दवाइयां देख सकते हैं या ऊपर दिए फॉर्म से सलाह ले सकते हैं।',
      faq2Q: 'डिलीवरी में कितना समय लगता है?',
      faq2A: 'ऑर्डर 24 घंटे में डिस्पैच हो जाता है। बड़े शहरों में 1-2 दिन और अन्य शहरों में 2-4 दिन लगते हैं।',
      faq3Q: 'क्या मेरी स्वास्थ्य जानकारी गोपनीय रहेगी?',
      faq3A: 'हाँ, बिल्कुल 100%। आपकी बीमारी और संपर्क विवरण पूरी तरह गोपनीय रखे जाते हैं।',
      faq4Q: 'मैं अपना ऑर्डर कैसे ट्रैक करूँ?',
      faq4A: 'ऑर्डर डिस्पैच होते ही आपको SMS पर लाइव कूरियर ट्रैकिंग लिंक मिल जाएगा।',
      ctaTitle: 'तुरंत दवा की सलाह चाहिए?',
      ctaSubtitle: 'हमारी कस्टमर हेल्पलाइन पर सीधे कॉल करें या हमारे सभी उत्पाद ऑनलाइन देखें।',
    },
    ur: {
      badge: 'کسٹمر کیئر اور رابطہ',
      title: 'ہم سے رابطہ کریں (Customer Support)',
      subtitle: 'ادویات کی معلومات، صحیح خوراک یا آرڈر کے متعلق کسی بھی سوال کے لیے ہم حاضر ہیں۔',
      tagline: 'ہیلپ لائن • 24 گھنٹے میں جواب • پورے ملک میں ترسیل',
      formTitle: 'ہمیں پیغام بھیجیں',
      formSubtitle: 'نیچے دیا گیا فارم پُر کریں، ہماری ٹیم 24 گھنٹے کے اندر آپ سے رابطہ کرے گی۔',
      fullName: 'پورا نام',
      namePlaceholder: 'مثال: محمد احمد',
      mobile: 'موبائل نمبر',
      mobilePlaceholder: '98765 43210',
      email: 'ای میل پتہ (اختیاری)',
      emailPlaceholder: 'you@email.com',
      city: 'شہر اور پن کوڈ',
      cityPlaceholder: 'مثال: دہلی، 110001',
      topic: 'مرض یا پروڈکٹ کی قسم',
      message: 'آپ کا پیغام یا سوال',
      messagePlaceholder: 'اپنی صحت، علامات یا آرڈر سے متعلق تفصیلات تحریر کریں...',
      privacyNotice: 'آپ کی معلومات ہمیشہ محفوظ اور مکمل رازدارانہ رکھی جاتی ہے۔',
      submitBtn: 'پیغام بھیجیں',
      submittingBtn: 'پیغام بھیجا جا رہا ہے...',
      successTitle: 'پیغام کامیابی سے موصول ہوا!',
      successSubtitle: 'ہم سے رابطہ کرنے کا شکریہ۔',
      tokenLabel: 'ریفرینس نمبر:',
      phoneLabel: 'رابطہ فون:',
      reviewTimeLabel: 'جواب کا متوقع وقت:',
      reviewTimeValue: '24 کاروباری گھنٹوں کے اندر',
      successNote: 'ہماری ٹیم کو آپ کا سوال موصول ہو چکا ہے۔ ہمارے نمائندے جلد ہی آپ سے فون پر رابطہ کریں گے۔',
      newInquiryBtn: 'ایک اور پیغام بھیجیں',
      shopBtn: 'مصنوعات دیکھیں',
      helpdeskTitle: 'کسٹمر کیئر ہیلپ ڈیسک',
      helplineLabel: 'فون ہیلپ لائن',
      helplineValue: '+91 تصدیق شدہ سپورٹ ڈیسک',
      helplineHours: 'پیر تا ہفتہ: صبح 9:00 تا رات 8:00 بجے تک',
      emailLabel: 'ای میل سپورٹ',
      emailValue: 'care@ifaqaremedies.com',
      emailNote: 'ای میل کا جواب 24 گھنٹوں کے اندر دیا جاتا ہے۔',
      addressLabel: 'دواخانہ آفس',
      addressValue: 'IFAQA ہربل ریمیڈیز، رجسٹرڈ دواخانہ، بھارت',
      addressNote: 'ملک بھر کے تمام پن کوڈز پر محفوظ ترسیل۔',
      speedTitle: 'ڈلیوری کا دورانیہ',
      metroSpeed: 'بڑے شہر (دہلی، ممبئی، بنگلور): 1 – 2 دن',
      tierSpeed: 'دیگر شہر اور اضلاع: 2 – 4 دن',
      remoteSpeed: 'پہاڑی و دور دراز علاقے: 4 – 6 دن',
      intlSpeed: 'بین الاقوامی ایکسپریس کوریئر: 5 – 8 دن',
      faqTitle: 'عام سوالات و جوابات (FAQ)',
      faq1Q: 'صحیح دوا کا انتخاب کیسے کریں؟',
      faq1A: 'آپ ویب سائٹ پر امراض کی فہرست سے دوا منتخب کر سکتے ہیں یا اوپر دیے گئے فارم کے ذریعے مشورہ طلب کر سکتے ہیں۔',
      faq2Q: 'ڈلیوری میں کتنا وقت لگتا ہے؟',
      faq2A: 'آرڈر 24 گھنٹوں میں روانہ ہو جاتا ہے۔ بڑے شہروں میں 1 سے 2 دن اور دیگر علاقوں میں 2 سے 4 دن لگتے ہیں۔',
      faq3Q: 'کیا میری معلومات محفوظ رہتی ہے؟',
      faq3A: 'جی ہاں، 100%۔ آپ کی تمام معلومات اور علامات مکمل خفیہ رکھی جاتی ہیں۔',
      faq4Q: 'میں اپنا آرڈر کیسے ٹریک کر سکتا ہوں؟',
      faq4A: 'آرڈر روانہ ہوتے ہی آپ کو SMS کے ذریعے لائیو کوریئر ٹریکنگ لنک موصول ہو جائے گا۔',
      ctaTitle: 'فوری رہنمائی درکار ہے؟',
      ctaSubtitle: 'ہماری ہیلپ لائن پر براہ راست کال کریں یا ہماری تمام ادویات دیکھیں۔',
    },
  };

  const c = content[language] || content.en;

  const topics = [
    { value: 'hazim', label: language === 'hi' ? 'पाचन एवं पेट स्वास्थ्य' : language === 'ur' ? 'ہاضم (معدہ و ہاضمہ)' : 'Digestive & Stomach Care' },
    { value: 'muqawwi', label: language === 'hi' ? 'ऊर्जा एवं शारीरिक शक्ति' : language === 'ur' ? 'طاقت و توانائی' : 'Energy & Vitality' },
    { value: 'sual', label: language === 'hi' ? 'खांसी, फेफड़े एवं श्वसन' : language === 'ur' ? 'کھانسی و سانس' : 'Cough & Respiratory Care' },
    { value: 'mafasil', label: language === 'hi' ? 'जोड़ों एवं मांसपेशियों का दर्द' : language === 'ur' ? 'جوڑوں کا درد' : 'Joint & Muscle Relief' },
    { value: 'jild', label: language === 'hi' ? 'त्वचा एवं सौंदर्य देखभाल' : language === 'ur' ? 'جلد و حسن' : 'Skin & Beauty Care' },
    { value: 'quwwat', label: language === 'hi' ? 'रोग प्रतिरोधक क्षमता (इम्युनिटी)' : language === 'ur' ? 'قوت مدافعت' : 'Immunity Wellness' },
    { value: 'order', label: language === 'hi' ? 'ऑर्डर एवं डिलीवरी संबंधी पूछताछ' : language === 'ur' ? 'آرڈر و ڈلیوری' : 'Order & Shipping Status' },
    { value: 'other', label: language === 'hi' ? 'अन्य सामान्य सवाल' : language === 'ur' ? 'دیگر سوالات' : 'Other General Inquiries' },
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    topic: 'hazim',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setTicketId(`IFQ-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-ifaqa-linen select-none pb-24 w-full">
      {/* 1. Full-Width Grand Hero Banner */}
      <section className="relative w-full bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811] text-ifaqa-linen py-18 md:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 border-b-2 border-ifaqa-sand/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(197,160,89,0.2)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative w-full max-w-[1720px] mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-ifaqa-sand">
            <Link href="/" className="hover:text-white transition-colors">{t('home')}</Link>
            <span>/</span>
            <span className="text-white font-bold">{c.badge}</span>
          </div>

          <div className="pt-1">
            <span className="inline-block px-3 py-1 bg-[#FAF5EC] text-ifaqa-plum font-serif font-bold text-xs uppercase tracking-wider border border-[#DFBA73] shadow-sm">
              {c.tagline}
            </span>
          </div>

          <div className="max-w-4xl space-y-3">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md leading-tight">
              {c.title}
            </h1>
            <p className="text-base sm:text-xl text-[#F5F0E6] font-sans font-medium leading-relaxed max-w-3xl">
              {c.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Full-Width Form & Info Grid */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Column: Easy Message Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-ifaqa-sand/70 p-8 sm:p-12 shadow-2xl space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum">
                {c.formTitle}
              </h2>
              <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans mt-1.5 leading-relaxed">
                {c.formSubtitle}
              </p>
            </div>

            {submitted ? (
              /* Success State */
              <div className="p-8 bg-[#FAF5EC] border-2 border-ifaqa-sand/80 space-y-5 animate-in fade-in duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-800 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900 block">
                      {c.successTitle}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-ifaqa-plum">
                      {formData.fullName || 'Valued Customer'}
                    </h3>
                  </div>
                </div>

                <div className="p-4 bg-white border border-ifaqa-sand/60 space-y-2 text-xs font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-ifaqa-blackberry uppercase tracking-wider font-bold">{c.tokenLabel}</span>
                    <span className="font-mono text-sm font-bold text-ifaqa-plum">{ticketId}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-ifaqa-sand/30 pt-2">
                    <span className="text-ifaqa-blackberry uppercase tracking-wider font-bold">{c.phoneLabel}</span>
                    <span className="font-mono text-ifaqa-plum font-bold">+91 {formData.phone}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-ifaqa-sand/30 pt-2">
                    <span className="text-ifaqa-blackberry uppercase tracking-wider font-bold">{c.reviewTimeLabel}</span>
                    <span className="font-serif text-emerald-800 font-bold">{c.reviewTimeValue}</span>
                  </div>
                </div>

                <p className="text-xs text-ifaqa-blackberry font-sans leading-relaxed">
                  {c.successNote}
                </p>

                <div className="pt-2 flex gap-3">
                  <Button3D
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ fullName: '', phone: '', email: '', city: '', topic: 'hazim', message: '' });
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    {c.newInquiryBtn}
                  </Button3D>
                  <Link href="/catalog">
                    <Button3D variant="primary" size="sm">
                      {c.shopBtn}
                    </Button3D>
                  </Link>
                </div>
              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-1.5">
                      {c.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={c.namePlaceholder}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-sans text-ifaqa-plum bg-[#FAF8F5] border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-1.5">
                      {c.mobile} *
                    </label>
                    <div className="flex border-2 border-ifaqa-sand/60 focus-within:border-ifaqa-plum transition-colors bg-[#FAF8F5] focus-within:bg-white">
                      <span className="inline-flex items-center px-3 bg-[#FAF5EC] border-r border-ifaqa-sand/60 text-xs font-mono font-bold text-ifaqa-plum">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder={c.mobilePlaceholder}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 px-3 py-2.5 text-xs sm:text-sm font-mono text-ifaqa-plum placeholder:text-ifaqa-blackberry/50 focus:outline-none bg-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-1.5">
                      {c.city}
                    </label>
                    <input
                      type="text"
                      placeholder={c.cityPlaceholder}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-sans text-ifaqa-plum bg-[#FAF8F5] border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-1.5">
                      {c.email}
                    </label>
                    <input
                      type="email"
                      placeholder={c.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-sans text-ifaqa-plum bg-[#FAF8F5] border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-1.5">
                    {c.topic} *
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm font-sans text-ifaqa-plum bg-[#FAF8F5] border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors"
                  >
                    {topics.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-1.5">
                    {c.message} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={c.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-sans text-ifaqa-plum bg-[#FAF8F5] border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors resize-y"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-ifaqa-blackberry font-sans">
                  <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>{c.privacyNotice}</span>
                </div>

                <Button3D
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center font-bold text-xs uppercase tracking-wider shadow-md py-3.5"
                  disabled={loading}
                >
                  {loading ? (
                    <span>{c.submittingBtn}</span>
                  ) : (
                    <>
                      <span>{c.submitBtn}</span>
                      <Send className="w-4 h-4 ml-2 text-ifaqa-sand" />
                    </>
                  )}
                </Button3D>
              </form>
            )}
          </div>

          {/* Right Column: Helpdesk & Shipping (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811] text-ifaqa-linen p-8 sm:p-10 border-2 border-ifaqa-sand/60 shadow-2xl space-y-6">
              <div className="inline-flex items-center justify-center p-2.5 bg-white border border-ifaqa-sand/60 shadow-md">
                <Image
                  src="/images/logo-framed.jpg"
                  alt="IFAQA Heritage Emblem"
                  width={160}
                  height={56}
                  priority
                  className="h-10 w-auto object-contain"
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-white">
                  {c.helpdeskTitle}
                </h3>
                <p className="text-xs text-ifaqa-linen/85 font-sans leading-relaxed">
                  IFAQA Herbal Remedies • Registered Desi Dawakhana
                </p>
              </div>

              <div className="space-y-4 pt-2 text-xs font-sans text-ifaqa-linen/95 divide-y divide-white/10">
                <div className="flex items-start gap-3 pt-2">
                  <div className="w-8 h-8 bg-ifaqa-plum border border-ifaqa-sand/50 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-white uppercase tracking-wider block text-xs">{c.helplineLabel}</span>
                    <span className="font-mono text-ifaqa-sand font-bold text-sm block mt-0.5">{c.helplineValue}</span>
                    <p className="text-[11px] text-ifaqa-linen/75 mt-0.5">{c.helplineHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3">
                  <div className="w-8 h-8 bg-ifaqa-plum border border-ifaqa-sand/50 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-white uppercase tracking-wider block text-xs">{c.emailLabel}</span>
                    <span className="font-mono text-ifaqa-sand font-bold text-sm block mt-0.5">{c.emailValue}</span>
                    <p className="text-[11px] text-ifaqa-linen/75 mt-0.5">{c.emailNote}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3">
                  <div className="w-8 h-8 bg-ifaqa-plum border border-ifaqa-sand/50 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-white uppercase tracking-wider block text-xs">{c.addressLabel}</span>
                    <p className="text-ifaqa-linen font-medium mt-0.5">{c.addressValue}</p>
                    <p className="text-[11px] text-ifaqa-linen/75 mt-0.5">{c.addressNote}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Speeds */}
            <div className="p-6 bg-white border-2 border-ifaqa-sand/70 shadow-lg space-y-3">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-ifaqa-plum" />
                <h4 className="font-serif text-sm font-bold text-ifaqa-plum uppercase tracking-wider">
                  {c.speedTitle}
                </h4>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <div className="p-2 bg-[#FAF8F5] border border-ifaqa-sand/40">
                  {c.metroSpeed}
                </div>
                <div className="p-2 bg-[#FAF8F5] border border-ifaqa-sand/40">
                  {c.tierSpeed}
                </div>
                <div className="p-2 bg-[#FAF8F5] border border-ifaqa-sand/40">
                  {c.remoteSpeed}
                </div>
                <div className="p-2 bg-[#FAF8F5] border border-ifaqa-sand/40">
                  {c.intlSpeed}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 3. FAQ Grid */}
        <div className="space-y-6 pt-6 border-t-2 border-ifaqa-sand/40">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum">
              {c.faqTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border-2 border-ifaqa-sand/60 space-y-2 shadow-sm">
              <h4 className="font-serif text-sm font-bold text-ifaqa-plum">{c.faq1Q}</h4>
              <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">{c.faq1A}</p>
            </div>
            <div className="p-6 bg-white border-2 border-ifaqa-sand/60 space-y-2 shadow-sm">
              <h4 className="font-serif text-sm font-bold text-ifaqa-plum">{c.faq2Q}</h4>
              <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">{c.faq2A}</p>
            </div>
            <div className="p-6 bg-white border-2 border-ifaqa-sand/60 space-y-2 shadow-sm">
              <h4 className="font-serif text-sm font-bold text-ifaqa-plum">{c.faq3Q}</h4>
              <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">{c.faq3A}</p>
            </div>
            <div className="p-6 bg-white border-2 border-ifaqa-sand/60 space-y-2 shadow-sm">
              <h4 className="font-serif text-sm font-bold text-ifaqa-plum">{c.faq4Q}</h4>
              <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">{c.faq4A}</p>
            </div>
          </div>
        </div>

        {/* 4. Bottom Action Banner */}
        <div className="p-8 sm:p-12 bg-white border-2 border-ifaqa-sand/70 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left max-w-2xl">
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum">
              {c.ctaTitle}
            </h4>
            <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans">
              {c.ctaSubtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-center">
            <Link href="/catalog">
              <Button3D variant="primary" size="lg" className="font-bold text-xs uppercase tracking-wider shadow-md">
                <span>{c.shopBtn}</span>
                <ArrowRight className="w-4 h-4 ml-1.5 text-ifaqa-sand" />
              </Button3D>
            </Link>
            <Link href="/">
              <button className="px-5 py-3 border-2 border-ifaqa-plum text-ifaqa-plum hover:bg-ifaqa-plum hover:text-white text-xs font-serif font-bold uppercase tracking-wider transition-all duration-200 shadow-sm">
                {t('home')}
              </button>
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}
