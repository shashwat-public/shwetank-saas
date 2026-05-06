export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";

const features = [
  {
    icon: "🎓",
    title: "Students & Teachers",
    desc: "Complete records for every student — name, class, parent, phone. Teacher details and subjects too.",
  },
  {
    icon: "💰",
    title: "Fee Management",
    desc: "Who paid fees, who hasn't — at a glance. Print receipts, track pending payments easily.",
  },
  {
    icon: "✅",
    title: "Attendance",
    desc: "Take daily attendance on mobile. Who came how many days — report ready instantly.",
  },
  {
    icon: "📝",
    title: "Exams & Results",
    desc: "Schedule exams, enter marks, grades calculate automatically. Print report cards.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Parent Portal",
    desc: "Parents view from home — child's fees, attendance, exam results. No need to visit school.",
  },
  {
    icon: "📋",
    title: "Notice Board",
    desc: "School notices reach everyone instantly. Highlight urgent announcements.",
  },
  {
    icon: "🗓️",
    title: "Timetable",
    desc: "Create timetable for every class. Which period has which subject — all clear.",
  },
  {
    icon: "📊",
    title: "Reports",
    desc: "Class-wise attendance, fee collection, exam results — all in one place. Download PDF.",
  },
];

const howTo = [
  {
    step: "1",
    icon: "🔐",
    title: "Login with Google",
    desc: "Login with your school Gmail account — no password to create or remember.",
  },
  {
    step: "2",
    icon: "⚙️",
    title: "Setup School Details",
    desc: "Go to Settings — enter school name, address, Principal name. Done once.",
  },
  {
    step: "3",
    icon: "🎓",
    title: "Add Students",
    desc: "Students → Add Student — enter name, class, parent's phone. That's it.",
  },
  {
    step: "4",
    icon: "📱",
    title: "Start Daily Work",
    desc: "Take attendance, collect fees, schedule exams — all on mobile, easily.",
  },
];

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const session = token ? await getSession(token) : null;
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-5">
            🏫 School Management Software
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Everything Your School Needs
            <br />
            <span className="text-indigo-600">In One Place — On Mobile</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Students, Fees, Attendance, Exams, Results — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/login"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-medium text-sm shadow-sm"
            >
              Admin Login →
            </Link>
            <Link
              href="/parent/login"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 font-medium text-sm border border-indigo-200"
            >
              Parent Login
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            What's Included?
          </h2>
          <p className="text-center text-gray-400 text-sm mb-8">
            Built for everything a school needs daily
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="text-3xl mb-2">{f.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How To */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            How to Get Started?
          </h2>
          <p className="text-center text-gray-400 text-sm mb-8">
            Just 4 steps — up and running in 5 minutes
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {howTo.map((h) => (
              <div
                key={h.step}
                className="bg-white rounded-xl border border-indigo-100 p-4 text-center shadow-sm"
              >
                <div className="w-8 h-8 bg-indigo-600 text-white font-black rounded-full flex items-center justify-center mx-auto mb-2">
                  {h.step}
                </div>
                <div className="text-2xl mb-2">{h.icon}</div>
                <div className="font-bold text-gray-800 text-sm mb-1">
                  {h.title}
                </div>
                <div className="text-gray-500 text-xs leading-relaxed">
                  {h.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Pricing
          </h2>
          <p className="text-center text-gray-400 text-sm mb-8">
            7 days completely free — no card required
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="rounded-2xl border-2 border-indigo-600 p-6 text-center shadow-lg relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm font-bold px-4 py-1 rounded-full">
                New Account
              </div>
              <h3 className="text-xl font-bold mb-1 text-gray-700 mt-2">
                First Year
              </h3>
              <div className="text-5xl font-extrabold text-indigo-600 mb-1">
                ₹4,999
              </div>
              <p className="text-gray-400 text-sm mb-4">One-time — 1 year included</p>
              <Link
                href="/login"
                className="block w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition mb-3 text-sm"
              >
                Try Free for 7 Days
              </Link>
              <a
                href="https://wa.me/919996865069"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gray-800 text-white font-bold py-3 rounded-xl hover:bg-gray-700 transition text-sm"
              >
                💳 Buy Now — ₹4,999
              </a>
            </div>
            <div className="rounded-2xl border-2 border-gray-200 p-6 text-center shadow-sm">
              <h3 className="text-xl font-bold mb-1 text-gray-700 mt-2">
                Renewal
              </h3>
              <div className="text-5xl font-extrabold text-indigo-600 mb-1">
                ₹2,500
              </div>
              <p className="text-gray-400 text-sm mb-4">Per year</p>
              <a
                href="https://wa.me/919996865069"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition text-sm"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-indigo-900 rounded-2xl p-10 text-white">
          <h2 className="text-2xl font-bold mb-2">
            Start Today — 7 Days Free
          </h2>
          <p className="text-indigo-300 mb-6 text-sm">
            No card required. No setup fees.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm text-indigo-300">
            <a href="tel:+919996865069" className="hover:text-white">
              📞 9996865069
            </a>
            <span className="hidden sm:inline">|</span>
            <a
              href="https://wa.me/919996865069"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              💬 WhatsApp
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="mailto:prasad.kamta@gmail.com" className="hover:text-white">
              ✉️ prasad.kamta@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}