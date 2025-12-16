import React from 'react';
import { DemoAnimation } from './components/DemoAnimation';
import { PracticeArea } from './components/PracticeArea';

function App() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-block p-4 rounded-full bg-white shadow-md mb-2">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            איך עושים <span className="text-blue-600">העתק-הדבק?</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            מדריך פשוט למתחילים: למדו כיצד להעתיק טקסט ממקום אחד ולהדביק אותו במקום אחר בעזרת העכבר.
          </p>
        </header>

        {/* Step by Step Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
             <div className="text-4xl mb-4">1️⃣</div>
             <h3 className="font-bold text-lg mb-2">סמנו את הטקסט</h3>
             <p className="text-gray-600">לחצו על המקש השמאלי וגררו את העכבר על המילים שרוצים להעתיק.</p>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
             <div className="text-4xl mb-4">2️⃣</div>
             <h3 className="font-bold text-lg mb-2">קליק ימני - העתק</h3>
             <p className="text-gray-600">לחצו על המקש הימני בעכבר על הטקסט המסומן, ובחרו בתפריט <b>"העתק"</b>.</p>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
             <div className="text-4xl mb-4">3️⃣</div>
             <h3 className="font-bold text-lg mb-2">קליק ימני - הדבק</h3>
             <p className="text-gray-600">עברו למקום החדש, לחצו שוב קליק ימני ובחרו <b>"הדבק"</b>.</p>
           </div>
        </section>

        {/* Animation Section */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">הדגמה (רק להסתכל) 👀</h2>
          <DemoAnimation />
          <p className="text-center text-gray-500 text-sm">האנימציה חוזרת על עצמה באופן אוטומטי</p>
        </section>

        {/* Interactive Practice Section */}
        <section>
          <PracticeArea />
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm pt-8">
          <p>נוצר באהבה ללומדים מתחילים ❤️</p>
        </footer>

      </div>
    </div>
  );
}

export default App;