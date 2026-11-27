'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Button3D } from '@/components/ui/Button3D';
import { MapPin, Phone, Mail, ShieldCheck, Send, CheckCircle2, Truck } from 'lucide-react';

export default function ContactPage() {
  const { language, t } = useLanguage();

  const content = {
    en: {
      badge: 'Contact',
      title: 'Contact us and customer care',
      subtitle: 'Reach our Saharanpur team directly for product guidance, dosage clarification, or order status.',
      formTitle: 'Send a message',
      formSubtitle: 'We reply to customer inquiries within one business day.',
      fullName: 'Full name',
      namePlaceholder: 'Rahul Sharma',
      mobile: 'Mobile number',
      mobilePlaceholder: '98765 43210',
      email: 'Email address (optional)',
      emailPlaceholder: 'you@example.com',
      city: 'City and pincode',
      cityPlaceholder: 'Saharanpur, 247231',
      topic: 'Topic',
      message: 'Message',
      messagePlaceholder: 'Write your question about a product, dosage, or order reference...',
      privacyNotice: 'Your contact details stay confidential and are never shared.',
      submitBtn: 'Send message',
      submittingBtn: 'Sending message',
      successTitle: 'Message received',
      tokenLabel: 'Reference',
      phoneLabel: 'Phone',
      reviewTimeLabel: 'Response time',
      reviewTimeValue: 'Within 24 business hours',
      successNote: 'We have logged your message. Our team will reach out by phone shortly.',
      newInquiryBtn: 'Send another message',
      shopBtn: 'Browse catalog',
      helpdeskTitle: 'Saharanpur dispensary',
      helplineLabel: 'Phone helpline',
      helplineValue: '+91 97298 40336',
      helplineHours: 'Monday to Saturday, 9:00 AM to 8:00 PM IST',
      emailLabel: 'Email',
      emailValue: 'support@ifaqa.in',
      addressLabel: 'Address',
      addressValue: 'Near Mandi Wali Masjid, Bartha Kayasth Pather, Saharanpur - 247231 (U.P.), India',
      speedTitle: 'Typical transit times',
      metroSpeed: 'Saharanpur & North India: 1 to 2 business days',
      tierSpeed: 'Major metro & regional cities: 2 to 4 business days',
      remoteSpeed: 'Remote & hill districts: 4 to 6 business days',
      faqTitle: 'Common questions',
      faqs: [
        {
          q: 'How do I select the right herbal remedy?',
          a: 'Browse our catalog by health concern (Digestive, Vitality, Respiratory, Joint care, Skin, or Immunity), or send us a message above describing your need and we will guide you clearly.',
        },
        {
          q: 'How long does delivery from Saharanpur take?',
          a: 'Orders placed before evening dispatch leave our Saharanpur dispensary within 24 hours. North India deliveries typically arrive in 1–2 business days, metros in 2–4 days, and remote districts in 4–6 days.',
        },
        {
          q: 'Do you offer Cash on Delivery (COD) and online payment?',
          a: 'Yes. Cash on Delivery is available across serviceable Indian pincodes alongside prepaid card and bank transfer options at checkout.',
        },
        {
          q: 'How should I take Majun, Safoof, or Sharbat?',
          a: 'Every bottle and jar carries exact dose and timing on the label (for example, 1 teaspoon with lukewarm water or milk after meals). If you take prescription medicines, consult your doctor first.',
        },
        {
          q: 'Do your products contain chemical steroids or preservatives?',
          a: 'Never. All 31 formulations are made strictly with whole dried herbs, wild roots, spices, and natural forest honey with zero chemical steroids or artificial colors.',
        },
        {
          q: 'How should I store the herbal jars and what is the shelf life?',
          a: 'Keep lids tightly closed in a cool, dry cabinet away from direct sunlight and wet spoons. Standard unopened shelf life is up to 24 months as stamped on each label.',
        },
        {
          q: 'How do I track my order after placing it?',
          a: 'Your Order ID (e.g., IFA202610001) appears right after checkout, and courier tracking is sent to your mobile number upon dispatch. Signed-in customers can view live order status inside Account > My Orders.',
        },
        {
          q: 'What if a bottle arrives damaged or spilled in transit?',
          a: 'Take a clear photo within 48 hours of delivery and send it on our helpline (+91 97298 40336) or support form with your Order ID—we replace transit-damaged packages quickly.',
        },
      ],
    },
    hi: {
      badge: 'संपर्क करें',
      title: 'संपर्क एवं कस्टमर सहायता',
      subtitle: 'उत्पाद की जानकारी, खुराक सलाह या ऑर्डर अपडेट के लिए सीधे हमारी सहारनपुर टीम से संपर्क करें।',
      formTitle: 'हमें संदेश भेजें',
      formSubtitle: 'हम 24 कार्य घंटों के भीतर हर संदेश का जवाब देते हैं।',
      fullName: 'पूरा नाम',
      namePlaceholder: 'राहुल शर्मा',
      mobile: 'मोबाइल नंबर',
      mobilePlaceholder: '98765 43210',
      email: 'ईमेल आईडी (वैकल्पिक)',
      emailPlaceholder: 'you@example.com',
      city: 'शहर और पिनकोड',
      cityPlaceholder: 'सहारनपुर, 247231',
      topic: 'विषय या श्रेणी',
      message: 'संदेश',
      messagePlaceholder: 'अपना स्वास्थ्य सवाल, दवा की जानकारी या ऑर्डर नंबर लिखें...',
      privacyNotice: 'आपकी जानकारी पूरी तरह सुरक्षित और गोपनीय रहती है।',
      submitBtn: 'संदेश भेजें',
      submittingBtn: 'भेजा जा रहा है',
      successTitle: 'संदेश प्राप्त हुआ',
      tokenLabel: 'रेफरेंस नंबर',
      phoneLabel: 'मोबाइल',
      reviewTimeLabel: 'अनुमानित उत्तर समय',
      reviewTimeValue: '24 कार्य घंटों के भीतर',
      successNote: 'हमें आपका संदेश मिल गया है। हमारी टीम जल्द आपसे फोन पर संपर्क करेगी।',
      newInquiryBtn: 'एक और संदेश भेजें',
      shopBtn: 'उत्पाद देखें',
      helpdeskTitle: 'सहारनपुर डिस्पेंसरी',
      helplineLabel: 'फ़ोन हेल्पलाइन',
      helplineValue: '+91 97298 40336',
      helplineHours: 'सोमवार से शनिवार, सुबह 9:00 से रात 8:00 बजे',
      emailLabel: 'ईमेल',
      emailValue: 'support@ifaqa.in',
      addressLabel: 'पता',
      addressValue: 'नियर मंडी वाली मस्जिद, बरथा कायस्थ पाथर, सहारनपुर - 247231 (उ.प्र.)',
      speedTitle: 'अनुमानित डिलीवरी समय',
      metroSpeed: 'सहारनपुर व उत्तर भारत: 1 से 2 दिन',
      tierSpeed: 'प्रमुख शहर व राज्य: 2 से 4 दिन',
      remoteSpeed: 'दूरदराज व पहाड़ी क्षेत्र: 4 से 6 दिन',
      faqTitle: 'अक्सर पूछे जाने वाले सवाल',
      faqs: [
        {
          q: 'सही हर्बल दवा कैसे चुनें?',
          a: 'आप कैटेगरी (पाचन, ताकत, खांसी, जोड़ों का दर्द, त्वचा या इम्युनिटी) के अनुसार उत्पाद देख सकते हैं या ऊपर दिए फॉर्म से मार्गदर्शन प्राप्त कर सकते हैं।',
        },
        {
          q: 'ऑर्डर पहुंचने में कितना समय लगता है?',
          a: 'ऑर्डर 24 घंटे में सहारनपुर से डिस्पैच हो जाते हैं। उत्तर भारत में 1–2 दिन, बड़े शहरों में 2–4 दिन और दूर के क्षेत्रों में 4–6 दिनों में डिलीवरी हो जाती है।',
        },
        {
          q: 'क्या कैश ऑन डिलीवरी (COD) उपलब्ध है?',
          a: 'हाँ, भारत के सभी प्रमुख पिनकोड पर कैश ऑन डिलीवरी (COD) और ऑनलाइन भुगतान दोनों विकल्प उपलब्ध हैं।',
        },
        {
          q: 'माजून, चूर्ण या शर्बत कैसे लें?',
          a: 'हर डिब्बे पर सही मात्रा व समय लिखा होता है (जैसे भोजन के बाद 1 चम्मच गुनगुने पानी या दूध से)। यदि आप कोई एलोपैथिक दवा ले रहे हैं तो डॉक्टर से परामर्श लें।',
        },
        {
          q: 'क्या उत्पादों में स्टेरॉयड या केमिकल मिलावट होती है?',
          a: 'बिल्कुल नहीं। सभी 31 उत्पाद शुद्ध जड़ी-बूटियों, जड़ों और प्राकृतिक शहद से बिना किसी स्टेरॉयड या कृत्रिम रंग के तैयार किए जाते हैं।',
        },
        {
          q: 'दवाओं को सुरक्षित कैसे रखें और एक्सपायरी क्या है?',
          a: 'ढक्कन को अच्छी तरह बंद करके ठंडी व सूखी जगह पर रखें और गीली चम्मच का उपयोग न करें। मानक शेल्फ लाइफ 24 माह तक होती है।',
        },
        {
          q: 'अपना ऑर्डर ट्रैक कैसे करें?',
          a: 'ऑर्डर डिस्पैच होते ही आपके मोबाइल पर ट्रैकिंग जानकारी आती है, और लॉगिन यूजर्स Account > My Orders में लाइव स्टेटस देख सकते हैं।',
        },
        {
          q: 'यदि कूरियर से पैकेट टूट जाए तो क्या होगा?',
          a: 'डिलीवरी के 48 घंटे के अंदर +91 97298 40336 पर फोटो व ऑर्डर नंबर भेजें — क्षतिग्रस्त उत्पाद को बिना किसी परेशानी के बदल दिया जाता है।',
        },
      ],
    },
    ur: {
      badge: 'رابطہ',
      title: 'ہم سے رابطہ کریں',
      subtitle: 'ادویات کی معلومات، خوراک یا آرڈر اسٹیٹس کے لیے ہماری سہارنپور ٹیم سے براہ راست رابطہ کریں۔',
      formTitle: 'پیغام بھیجیں',
      formSubtitle: 'ہم ایک کاروباری دن کے اندر جواب دیتے ہیں۔',
      fullName: 'پورا نام',
      namePlaceholder: 'محمد احمد',
      mobile: 'موبائل نمبر',
      mobilePlaceholder: '98765 43210',
      email: 'ای میل (اختیاری)',
      emailPlaceholder: 'you@example.com',
      city: 'شہر اور پن کوڈ',
      cityPlaceholder: 'سہارنپور، 247231',
      topic: 'موضوع',
      message: 'پیغام',
      messagePlaceholder: 'اپنا سوال یا آرڈر نمبر تحریر کریں...',
      privacyNotice: 'آپ کی معلومات مکمل محفوظ اور خفیہ رکھی جاتی ہیں۔',
      submitBtn: 'پیغام بھیجیں',
      submittingBtn: 'بھیجا جا رہا ہے',
      successTitle: 'پیغام موصول ہوگیا',
      tokenLabel: 'حوالہ نمبر',
      phoneLabel: 'فون',
      reviewTimeLabel: 'جواب کا وقت',
      reviewTimeValue: '24 کاروباری گھنٹوں میں',
      successNote: 'ہمیں آپ کا پیغام مل گیا ہے۔ ہماری ٹیم جلد آپ سے فون پر رابطہ کرے گی۔',
      newInquiryBtn: 'نیا پیغام بھیجیں',
      shopBtn: 'مصنوعات دیکھیں',
      helpdeskTitle: 'سہارنپور دواخانہ',
      helplineLabel: 'فون ہیلپ لائن',
      helplineValue: '+91 97298 40336',
      helplineHours: 'پیر تا ہفتہ، صبح 9:00 تا رات 8:00 بجے',
      emailLabel: 'ای میل',
      emailValue: 'support@ifaqa.in',
      addressLabel: 'پتہ',
      addressValue: 'قریب منڈی والی مسجد، برتھہ کائستھ پتھر، سہارنپور - 247231 (یوپی)',
      speedTitle: 'ترسیل کا وقت',
      metroSpeed: 'سہارنپور اور شمالی بھارت: 1 سے 2 دن',
      tierSpeed: 'بڑے شہر: 2 سے 4 دن',
      remoteSpeed: 'دور دراز علاقے: 4 سے 6 دن',
      faqTitle: 'عام سوالات',
      faqs: [
        {
          q: 'صحیح دوا کیسے منتخب کریں؟',
          a: 'آپ اقسام کے مطابق مصنوعات دیکھ سکتے ہیں یا اوپر دیے گئے فارم سے رہنمائی حاصل کر سکتے ہیں۔',
        },
        {
          q: 'ڈلیوری میں کتنا وقت لگتا ہے؟',
          a: 'آرڈر 24 گھنٹوں میں سہارنپور سے روانہ ہو کر 2 سے 5 کاروباری دن میں پہنچ جاتا ہے۔',
        },
        {
          q: 'کیا کیش آن ڈلیوری (COD) دستیاب ہے؟',
          a: 'جی ہاں، بھارت کے تمام بڑے شہروں میں کیش آن ڈلیوری اور آن لائن ادائیگی دستیاب ہے۔',
        },
        {
          q: 'معجون، سفوف اور شربت استعمال کرنے کا طریقہ کیا ہے؟',
          a: 'ہر بوتل اور ڈبے پر خوراک کی واضح مقدار (مثلاً کھانے کے بعد نیم گرم دودھ یا پانی کے ساتھ 1 چمچ) درج ہوتی ہے۔',
        },
        {
          q: 'کیا ادویات میں سٹیرائیڈز یا کیمیکل شامل ہوتے ہیں؟',
          a: 'ہرگز نہیں۔ تمام مصنوعات خالص جڑی بوٹیوں اور شہد سے بغیر سٹیرائیڈز کے تیار کی جاتی ہیں۔',
        },
        {
          q: 'ادویات کو محفوظ کیسے رکھیں؟',
          a: 'ڈھکن مضبوطی سے بند رکھیں، دھوپ سے دور ٹھنڈی خشک جگہ پر رکھیں۔ معیار 24 ماہ تک رہتا ہے۔',
        },
        {
          q: 'اپنا پارسل کیسے ٹریک کریں؟',
          a: 'روانگی پر آپ کے موبائل پر ٹریکنگ تفصیلات بھیجی جاتی ہیں اور Account > My Orders میں بھی اسٹیٹس نظر آتا ہے۔',
        },
        {
          q: 'اگر پارسل راستے میں خراب ہو جائے تو کیا ہوگا؟',
          a: 'ڈلیوری کے 48 گھنٹوں کے اندر تصویر اور آرڈر نمبر +91 97298 40336 پر بھیجیں، ہم فوراً تبدیلی کر دیں گے۔',
        },
      ],
    },
  }[language] || {
    badge: 'Contact',
    title: 'Contact us and customer care',
    subtitle: 'Reach our Saharanpur team directly for product guidance, dosage clarification, or order status.',
    formTitle: 'Send a message',
    formSubtitle: 'We reply to customer inquiries within one business day.',
    fullName: 'Full name',
    namePlaceholder: 'Rahul Sharma',
    mobile: 'Mobile number',
    mobilePlaceholder: '98765 43210',
    email: 'Email address (optional)',
    emailPlaceholder: 'you@example.com',
    city: 'City and pincode',
    cityPlaceholder: 'Saharanpur, 247231',
    topic: 'Topic',
    message: 'Message',
    messagePlaceholder: 'Write your question about a product, dosage, or order reference...',
    privacyNotice: 'Your contact details stay confidential and are never shared.',
    submitBtn: 'Send message',
    submittingBtn: 'Sending message',
    successTitle: 'Message received',
    tokenLabel: 'Reference',
    phoneLabel: 'Phone',
    reviewTimeLabel: 'Response time',
    reviewTimeValue: 'Within 24 business hours',
    successNote: 'We have logged your message. Our team will reach out by phone shortly.',
    newInquiryBtn: 'Send another message',
    shopBtn: 'Browse catalog',
    helpdeskTitle: 'Saharanpur dispensary',
    helplineLabel: 'Phone helpline',
    helplineValue: '+91 97298 40336',
    helplineHours: 'Monday to Saturday, 9:00 AM to 8:00 PM IST',
    emailLabel: 'Email',
    emailValue: 'support@ifaqa.in',
    addressLabel: 'Address',
    addressValue: 'Near Mandi Wali Masjid, Bartha Kayasth Pather, Saharanpur - 247231 (U.P.), India',
    speedTitle: 'Typical transit times',
    metroSpeed: 'Saharanpur & North India: 1 to 2 business days',
    tierSpeed: 'Major metro & regional cities: 2 to 4 business days',
    remoteSpeed: 'Remote & hill districts: 4 to 6 business days',
    faqTitle: 'Common questions',
    faqs: [
      {
        q: 'How do I select the right herbal remedy?',
        a: 'Browse our catalog by health concern (Digestive, Vitality, Respiratory, Joint care, Skin, or Immunity), or send us a message above describing your need and we will guide you clearly.',
      },
      {
        q: 'How long does delivery from Saharanpur take?',
        a: 'Orders placed before evening dispatch leave our Saharanpur dispensary within 24 hours. North India deliveries typically arrive in 1–2 business days, metros in 2–4 days, and remote districts in 4–6 days.',
      },
      {
        q: 'Do you offer Cash on Delivery (COD) and online payment?',
        a: 'Yes. Cash on Delivery is available across serviceable Indian pincodes alongside prepaid card and bank transfer options at checkout.',
      },
      {
        q: 'How should I take Majun, Safoof, or Sharbat?',
        a: 'Every bottle and jar carries exact dose and timing on the label (for example, 1 teaspoon with lukewarm water or milk after meals). If you take prescription medicines, consult your doctor first.',
      },
      {
        q: 'Do your products contain chemical steroids or preservatives?',
        a: 'Never. All 31 formulations are made strictly with whole dried herbs, wild roots, spices, and natural forest honey with zero chemical steroids or artificial colors.',
      },
      {
        q: 'How should I store the herbal jars and what is the shelf life?',
        a: 'Keep lids tightly closed in a cool, dry cabinet away from direct sunlight and wet spoons. Standard unopened shelf life is up to 24 months as stamped on each label.',
      },
      {
        q: 'How do I track my order after placing it?',
        a: 'Your Order ID (e.g., IFA202610001) appears right after checkout, and courier tracking is sent to your mobile number upon dispatch. Signed-in customers can view live order status inside Account > My Orders.',
      },
      {
        q: 'What if a bottle arrives damaged or spilled in transit?',
        a: 'Take a clear photo within 48 hours of delivery and send it on our helpline (+91 97298 40336) or support form with your Order ID—we replace transit-damaged packages quickly.',
      },
    ],
  };

  const topics = [
    { value: 'hazim', label: language === 'hi' ? 'पाचन एवं पेट स्वास्थ्य' : language === 'ur' ? 'ہاضمہ اور معدہ' : 'Digestive care' },
    { value: 'muqawwi', label: language === 'hi' ? 'ऊर्जा एवं शारीरिक शक्ति' : language === 'ur' ? 'طاقت و توانائی' : 'Energy and vitality' },
    { value: 'sual', label: language === 'hi' ? 'खांसी एवं श्वसन' : language === 'ur' ? 'کھانسی و سانس' : 'Respiratory care' },
    { value: 'mafasil', label: language === 'hi' ? 'जोड़ों का दर्द' : language === 'ur' ? 'جوڑوں کا درد' : 'Joint and muscle relief' },
    { value: 'jild', label: language === 'hi' ? 'त्वचा देखभाल' : language === 'ur' ? 'جلد و حسن' : 'Skin care' },
    { value: 'quwwat', label: language === 'hi' ? 'इम्युनिटी' : language === 'ur' ? 'قوت مدافعت' : 'Immunity wellness' },
    { value: 'order', label: language === 'hi' ? 'ऑर्डर एवं डिलीवरी' : language === 'ur' ? 'آرڈر و ڈلیوری' : 'Order and shipping' },
    { value: 'other', label: language === 'hi' ? 'अन्य सवाल' : language === 'ur' ? 'دیگر سوالات' : 'General inquiry' },
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
    }, 400);
  };

  return (
    <div className="min-h-screen bg-ifaqa-linen select-none pb-8 md:pb-10 w-full font-sans">
      <section className="w-full border-b border-ifaqa-plum/10 bg-ifaqa-linen py-7 md:py-10 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto space-y-2.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5A6962]">
            <Link href="/" className="hover:text-ifaqa-plum transition-colors">{t('home')}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ifaqa-plum font-medium">{content.badge}</span>
          </nav>
          <h1 className="font-serif font-normal text-3xl sm:text-5xl text-ifaqa-plum leading-tight">
            {content.title}
          </h1>
          <p className="text-base sm:text-lg text-[#3E524A] leading-relaxed max-w-2xl">
            {content.subtitle}
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-7 md:py-10 space-y-8 md:space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-ifaqa-plum/10 p-6 sm:p-8 shadow-luxury-card space-y-5">
            <div>
              <h2 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
                {content.formTitle}
              </h2>
              <p className="text-sm text-[#5A6962] mt-1">
                {content.formSubtitle}
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-ifaqa-cashmere/70 border border-ifaqa-plum/10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#E8F3EE] text-[#165A45] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#165A45] block">
                      {content.successTitle}
                    </span>
                    <h3 className="text-base font-semibold text-ifaqa-plum">
                      {formData.fullName}
                    </h3>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white border border-ifaqa-plum/10 space-y-2 text-xs tabular-nums">
                  <div className="flex items-center justify-between">
                    <span className="text-[#5A6962]">{content.tokenLabel}</span>
                    <span className="font-mono font-medium text-ifaqa-plum" dir="ltr">{ticketId}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-ifaqa-plum/10 pt-2">
                    <span className="text-[#5A6962]">{content.phoneLabel}</span>
                    <span className="font-mono text-ifaqa-plum" dir="ltr">+91 {formData.phone}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-ifaqa-plum/10 pt-2">
                    <span className="text-[#5A6962]">{content.reviewTimeLabel}</span>
                    <span className="text-[#165A45] font-medium">{content.reviewTimeValue}</span>
                  </div>
                </div>

                <p className="text-xs text-[#5A6962] leading-relaxed">
                  {content.successNote}
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Button3D
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ fullName: '', phone: '', email: '', city: '', topic: 'hazim', message: '' });
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    {content.newInquiryBtn}
                  </Button3D>
                  <Link href="/catalog">
                    <Button3D variant="primary" size="sm">
                      {content.shopBtn}
                    </Button3D>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                      {content.fullName}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={content.namePlaceholder}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full h-10 px-3.5 rounded-lg text-sm text-ifaqa-plum bg-ifaqa-linen border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                      {content.mobile}
                    </label>
                    <div className="flex h-10 rounded-lg border border-ifaqa-plum/15 focus-within:border-ifaqa-plum transition-colors bg-ifaqa-linen focus-within:bg-white overflow-hidden" dir="ltr">
                      <span className="inline-flex items-center px-3 bg-ifaqa-cashmere border-e border-ifaqa-plum/10 text-xs font-mono text-ifaqa-plum">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder={content.mobilePlaceholder}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 px-3 text-sm font-mono text-ifaqa-plum focus:outline-none bg-transparent tabular-nums"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                      {content.city}
                    </label>
                    <input
                      type="text"
                      placeholder={content.cityPlaceholder}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-10 px-3.5 rounded-lg text-sm text-ifaqa-plum bg-ifaqa-linen border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                      {content.email}
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      placeholder={content.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-10 px-3.5 rounded-lg text-sm text-ifaqa-plum bg-ifaqa-linen border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                    {content.topic}
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg text-sm text-ifaqa-plum bg-ifaqa-linen border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors"
                  >
                    {topics.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                    {content.message}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={content.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 rounded-lg text-sm text-ifaqa-plum bg-ifaqa-linen border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors resize-y"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-[#5A6962]">
                  <ShieldCheck className="w-4 h-4 text-[#165A45] shrink-0" strokeWidth={1.5} />
                  <span>{content.privacyNotice}</span>
                </div>

                <Button3D
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  <span>{loading ? content.submittingBtn : content.submitBtn}</span>
                  {!loading && <Send className="w-4 h-4 ms-2 rtl-flip" strokeWidth={1.5} />}
                </Button3D>
              </form>
            )}
          </div>

          {/* Direct Contact Info & Transit Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-ifaqa-cashmere rounded-2xl border border-ifaqa-plum/10 p-6 sm:p-8 space-y-5">
              <h3 className="font-serif font-normal text-2xl text-ifaqa-plum">
                {content.helpdeskTitle}
              </h3>

              <div className="space-y-4 text-sm divide-y divide-ifaqa-plum/10">
                <div className="flex items-start gap-3 pt-1">
                  <Phone className="w-4 h-4 text-[#5A6962] shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <span className="text-xs text-[#5A6962] block">{content.helplineLabel}</span>
                    <a href="tel:+919729840336" dir="ltr" className="font-mono font-medium text-ifaqa-plum hover:underline tabular-nums block mt-0.5">
                      {content.helplineValue}
                    </a>
                    <span className="text-xs text-[#5A6962] block mt-0.5">{content.helplineHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <Mail className="w-4 h-4 text-[#5A6962] shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <span className="text-xs text-[#5A6962] block">{content.emailLabel}</span>
                    <a href="mailto:support@ifaqa.in" dir="ltr" className="font-mono font-medium text-ifaqa-plum hover:underline break-all block mt-0.5">
                      {content.emailValue}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <MapPin className="w-4 h-4 text-[#5A6962] shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <span className="text-xs text-[#5A6962] block">{content.addressLabel}</span>
                    <p className="text-ifaqa-plum mt-0.5 leading-relaxed">{content.addressValue}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-ifaqa-plum/10 space-y-3 shadow-luxury-card">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
                <h4 className="text-sm font-medium text-ifaqa-plum">
                  {content.speedTitle}
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-[#3E524A]">
                <li className="p-2.5 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/10">{content.metroSpeed}</li>
                <li className="p-2.5 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/10">{content.tierSpeed}</li>
                <li className="p-2.5 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/10">{content.remoteSpeed}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Expanded Real Customer FAQs */}
        <div className="space-y-4 pt-6 border-t border-ifaqa-plum/10">
          <h3 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
            {content.faqTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.faqs.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-ifaqa-plum/10 shadow-luxury-card space-y-1.5"
              >
                <h4 className="text-sm font-semibold text-ifaqa-plum">{item.q}</h4>
                <p className="text-sm text-[#5A6962] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
