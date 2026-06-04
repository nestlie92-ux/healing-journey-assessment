import React, { useState } from 'react';
import {
  ArrowRight,
  Heart,
  Loader,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

const DarkestSeasonAssessment = () => {
  const [step, setStep] = useState('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [answers, setAnswers] = useState({
    struggle: '',
    belief: '',
    ready: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      id: 'struggle',
      title: "What's weighing on your heart right now?",
      subtitle: 'Choose what resonates most',
      options: [
        { value: 'betrayal', label: '💔 Betrayal & Infidelity' },
        { value: 'infertility', label: '🤰 Infertility & Loss' },
        { value: 'health', label: '🏥 Health Crisis' },
        { value: 'finance', label: '💰 Financial Stress' },
        { value: 'grief', label: '🕊️ Grief & Loss' },
        { value: 'identity', label: '🪞 Identity Crisis' },
        { value: 'faith', label: '❓ Doubting God' },
        { value: 'other', label: '😔 Something Else' }
      ]
    },
    {
      id: 'belief',
      title: "What's the lie you believe about yourself right now?",
      subtitle: 'Be honest. This stays between you and God.',
      options: [
        { value: 'unworthy', label: '"I\'m not worthy of love"' },
        { value: 'failure', label: '"I\'m a failure"' },
        { value: 'alone', label: '"I\'m too broken to be helped"' },
        { value: 'abandoned', label: '"God has abandoned me"' },
        { value: 'wrong', label: '"This is punishment for my sins"' },
        { value: 'strong', label: '"I have to be strong alone"' },
        { value: 'hopeless', label: '"Things will never get better"' }
      ]
    },
    {
      id: 'ready',
      title: 'Are you ready to challenge that lie?',
      subtitle: 'Healing starts with one small yes',
      options: [
        { value: 'yes', label: 'Yes, I want to heal' },
        { value: 'maybe', label: 'I\'m not sure yet' },
        { value: 'scared', label: 'I\'m scared to hope' }
      ]
    }
  ];

  const isValidEmail = /\S+@\S+\.\S+/.test(email);
const handleStartAssessment = async () => {
  try {

    const response = await fetch(
      "https://healing-journey-api.onrender.com/subscribe",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email
        })
      }

    );
    const data = await response.json();

    console.log('Backend response:', data);

    setStep('questions');

  } catch (error) {

    console.error('Error sending email:', error);

    setStep('questions');
  }
};
  const handleQuestionAnswer = (questionId, value) => {
    const updatedAnswers = {
      ...answers,
      [questionId]: value
    };

    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      generateInsight(updatedAnswers);
    }
  };

  const personalizedContent = {
  betrayal: {
    excerpt:
      "My husband betrayed me while I was pregnant with our second child. I felt destroyed. Abandoned. But through prayer and painful work, I chose forgiveness. Fifteen years later, our marriage is stronger than ever.",

    testimonial:
      "I thought my marriage was over. This journal helped me process my pain and reconnect with God during the darkest season of my life. – Sarah M."
  },

  infertility: {
    excerpt:
      "I was told I couldn't have children because of fibroids. I waited. I prayed. I cried. Then I found a doctor who believed healing was possible. My body recovered and my story changed forever.",

    testimonial:
      "For the first time, I felt understood. Every page felt like it was written for me. – Amanda T."
  },

  health: {
    excerpt:
      "When we were told my husband had end-stage kidney failure, fear consumed our family. Through faith, sacrifice, and God's grace, we found hope in the middle of uncertainty.",

    testimonial:
      "This journal gave me strength when doctors could not give me answers. – Rebecca J."
  },

  finance: {
    excerpt:
      "For nearly two years I lived without income and wondered how we would survive. Yet God provided through unexpected people, unexpected opportunities, and unexpected grace.",

    testimonial:
      "I stopped feeling trapped by fear and started believing again. – Nicole W."
  },

  grief: {
    excerpt:
      "Loss changes you. It forces you to rebuild a life you never expected. Yet even in grief, God continues writing a story of hope and restoration.",

    testimonial:
      "This devotional became my companion through the hardest season of my life. – Melissa K."
  },

  identity: {
    excerpt:
      "I spent years chasing success, believing achievement defined my worth. When I finally let go, I discovered peace, purpose, and a deeper identity in God.",

    testimonial:
      "This journal helped me rediscover who I am beyond my circumstances. – Lauren B."
  },

  faith: {
    excerpt:
      "There were seasons when prayers seemed unanswered and heaven felt silent. Yet God was still working behind the scenes, preparing something greater than I could see.",

    testimonial:
      "My faith feels stronger today than it has in years. – Jennifer P."
  },

  other: {
    excerpt:
      "Every reflection in this journal comes from real struggles, real tears, and real healing. No matter your situation, there is hope for your next chapter.",

    testimonial:
      "I finally feel like someone understands what I'm carrying. – Rachel D."
  },
};

  const generateInsight = (finalAnswers) => {
    setLoading(true);
    setStep('loading');

    const timeout = setTimeout(() => {
      const insights = {
        betrayal: {
          unworthy:
            "You're equating infidelity with your worth. But God's love doesn't depend on anyone else's choices.",
          hopeless:
            "Betrayal cuts deep because trust was broken. But God's love doesn't betray. It endures."
        },

        infertility: {
          failure:
            "Your body's limitations don't define your purpose. Your value wasn't meant for biology alone.",
          abandoned:
            "In the waiting, God is not silent. He's preparing something greater than you can see."
        },

        health: {
          failure:
            "Your diagnosis doesn't define your destiny. God is writing a story of redemption through this.",
          abandoned:
            "In sickness, healing takes many forms. God is present in the pain."
        },

        faith: {
          abandoned:
            "Doubt is not rejection of God. It's wrestling with the deepest parts of belief. That's holy.",
          wrong:
            "Your questions don't anger God. Your honesty draws you closer to truth."
        },

        default:
          "The lie you're believing is loud, but God's truth about you is louder still."
      };

      const categoryKey = finalAnswers.struggle || 'default';
      const beliefKey = finalAnswers.belief || 'default';

      const baseInsight =
        insights[categoryKey]?.[beliefKey] || insights.default;

      const resultPages = {
        betrayal: {
          title: "Your Heart Is Trying To Heal From Broken Trust",
          cta:
            "Discover the healing journey designed specifically for women recovering from betrayal."
       },

        infertility: {
          title: "Your Pain Comes From Waiting For Something Deeply Desired",
          cta:
            "Explore the exact lessons I learned during my infertility journey."
        },

        health: {
          title: "Your Strength Has Been Tested Beyond What Feels Fair",
          cta:
            "Find encouragement, prayers, and reflection exercises for health challenges."
        },

        finance: {
          title: "The Weight You're Carrying Is Bigger Than Money",
          cta:
            "Learn how to find peace during seasons of uncertainty."
        },

        grief: {
          title: "You're Learning To Live With A Loss You Never Wanted",
          cta:
            "Receive guidance for navigating grief with faith and hope." 
        },

        identity: {
          title: "You've Forgotten Who You Are Beneath The Pain",
          cta:
            "Rediscover your identity and purpose."
        },

        faith: {
          title: "You're Wrestling With Questions Most People Never Say Out Loud",
          cta:
            "Strengthen your faith even in seasons of doubt."
       },

        other: {
          title: "You're Carrying Something Heavy Right Now",
          cta:
            "Take the next step toward healing and clarity."
       },
     };

      setResult({
        insight: baseInsight,
        name: name || 'Beautiful Soul',
        title: 
          resultPages[categoryKey]?.title || 
          "Your Personalized Insight",
        cta: 
          resultPages[categoryKey]?.cta || 
          "Begin your healing journey today.",
        excerpt: 
          personalizedContent[categoryKey]?.excerpt,
        testimonial: 
          personalizedContent[categoryKey]?.testimonial
     });  

      setLoading(false);
      setStep('result');
    }, 2000);

    return () => clearTimeout(timeout);
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // INTRO SCREEN
  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br bg-gradient-to-br from-[#F8F5F0] via-[#FCFBF8] to-[#F2ECE4] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 border border-amber-100">

          <div className="text-center mb-6">
            <div className="text-4xl mb-2">✦</div>

            <h1 className="text-5xl font-bold tracking-tight text-[#2D1B0E] mb-4 leading-tight">
              Emotional Clarity Assessment
            </h1>

            <p className="text-[#6B5B4D] text-lg leading-relaxed">
              Gain clarity on the emotional patterns shaping your life and uncover the next step toward healing, confidence, and peace.
            </p>

            <div className="h-1 w-12 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto mt-3"></div>
          </div>

          <div className="bg-[#FAF7F2] rounded-3xl p-6 mb-8 border border-[#E8DCC8] shadow-sm">
            <p className="text-sm font-semibold text-amber-900 mb-2">
              Inside this private assessment, you'll:
            </p>

            <ul className="text-sm text-amber-800 space-y-2">
              <li>✓ Identify what's weighing you down</li>
              <li>✓ Name the lie you've been believing</li>
              <li>✓ Receive a personalized message of hope</li>
              <li>✓ Discover your next step toward healing</li>
            </ul>
          </div>

          <div className="space-y-4 mb-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                What's your name?
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your first name"
                className="w-full px-4 py-4 border-2 border-amber-100 rounded-2xl focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Your email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-4 border-2 border-amber-100 rounded-2xl focus:outline-none focus:border-amber-400 transition"
              />

              {email && !isValidEmail && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid email
                </p>
              )}
            </div>

          </div>

          <button
            onClick={handleStartAssessment}
            disabled={!name || !isValidEmail}
            className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition ${
              name && isValidEmail
                ? 'bg-[#B08D57] text-white hover:opacity-90'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Reveal My Insight →
            <ArrowRight size={18} />
          </button>
          <p className="text-xs text-center text-gray-500 mt-4">
           Your responses remain private and confidential.
          </p>

        </div>
      </div>
    );
  }

  // QUESTIONS SCREEN
  if (step === 'questions') {
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br bg-gradient-to-br from-[#F8F5F0] via-[#FCFBF8] to-[#F2ECE4] flex items-center justify-center p-4">

        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 border border-amber-100">

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 h-2 rounded-full mb-6">
            <div
              className="bg-amber-400 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`
              }}
            ></div>
          </div>

          {/* Back Button */}
          {currentQuestionIndex > 0 && (
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-sm text-gray-500 mb-4 hover:text-gray-700"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentQuestion.title}
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            {currentQuestion.subtitle}
          </p>

          <div className="space-y-3">

            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  handleQuestionAnswer(currentQuestion.id, option.value)
                }
                className="w-full text-left px-6 py-5 border border-[#E8DCC8] rounded-2xl font-medium text-gray-700 hover:border-[#B08D57] hover:shadow-lg hover:bg-[#FAF7F2] transition-all duration-300"
              >
                {option.label}
              </button>
            ))}

          </div>

        </div>
      </div>
    );
  }

  // LOADING SCREEN
  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br bg-gradient-to-br from-[#F8F5F0] via-[#FCFBF8] to-[#F2ECE4] flex items-center justify-center p-4">

        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-amber-100">

          <Loader
            className="animate-spin text-amber-500 mx-auto mb-4"
            size={40}
          />

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Analyzing Your Healing Profile...
          </h2>

          <p className="text-sm text-gray-500">
            We're identifying the emotional patterns most affecting your current season.
          </p>

        </div>
      </div>
    );
  }

  // RESULT SCREEN
  if (step === 'result' && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br bg-gradient-to-br from-[#F8F5F0] via-[#FCFBF8] to-[#F2ECE4] flex items-center justify-center p-4">

        <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 border border-amber-100">

          <div className="flex items-center gap-2 text-rose-500 mb-4 font-semibold">
            <Heart size={18} fill="currentColor" />
            Your Healing Profile
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {result.name}, here is what we discovered:
          </h2>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {result.insight}
            </p>
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 mb-6">
           
            <h3 className="font-bold text-lg mb-3 text-amber-900">
              From The Journal
           </h3>

          <p className="text-gray-700 italic leading-relaxed">
            "{result.excerpt}"
           </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 shadow-sm">

            <div className="text-yellow-500 mb-2">
             ⭐⭐⭐⭐⭐
            </div>

            <p className="text-gray-700 italic mb-3">
             "{result.testimonial}"
            </p>

          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 mb-6">

            <div className="flex items-center gap-2 text-rose-600 font-semibold mb-2">
              <CheckCircle size={18} />
              Recommended Next Step
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
             The greatest breakthroughs begin when awareness turns into action.
             Your next season can look very different from your current one.
            </p>

          </div>

          {/* CTA BOX */}
          <div className="bg-[#B08D57] rounded-2xl p-6 text-white text-center">

            <h3 className="text-xl font-bold mb-2">
              Ready For Deeper Transformation?
            </h3>

            <p className="text-sm mb-4 opacity-90">
              Continue your journey with practical tools, emotional healing resources, and guided support designed to help you move forward with confidence.
            </p>

            <button
              onClick={() =>
               window.open(
                 "https://payhip.com/b/3tB1R",
                 "_blank"
                )
              }
              className="bg-white text-rose-600 px-6 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition"
            >
              Start My Healing Journey
            </button>

          </div>

        </div>
      </div>
    );
  }

  return null;
};

export default DarkestSeasonAssessment;