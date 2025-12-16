import React, { useEffect, useState } from 'react';
import { AnimationState } from '../types';
import { CursorIcon } from './CursorIcon';

export const DemoAnimation: React.FC = () => {
  const [state, setState] = useState<AnimationState>(AnimationState.IDLE);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const runStep = () => {
      switch (state) {
        case AnimationState.IDLE:
          timeout = setTimeout(() => setState(AnimationState.MOVE_TO_SOURCE), 1000);
          break;
        case AnimationState.MOVE_TO_SOURCE:
          timeout = setTimeout(() => setState(AnimationState.HIGHLIGHT_TEXT), 1000);
          break;
        case AnimationState.HIGHLIGHT_TEXT:
          timeout = setTimeout(() => setState(AnimationState.RIGHT_CLICK_SOURCE), 800);
          break;
        case AnimationState.RIGHT_CLICK_SOURCE:
          timeout = setTimeout(() => setState(AnimationState.CLICK_COPY), 1000);
          break;
        case AnimationState.CLICK_COPY:
          timeout = setTimeout(() => setState(AnimationState.MOVE_TO_TARGET), 600);
          break;
        case AnimationState.MOVE_TO_TARGET:
          timeout = setTimeout(() => setState(AnimationState.RIGHT_CLICK_TARGET), 1000);
          break;
        case AnimationState.RIGHT_CLICK_TARGET:
          timeout = setTimeout(() => setState(AnimationState.CLICK_PASTE), 1000);
          break;
        case AnimationState.CLICK_PASTE:
          timeout = setTimeout(() => setState(AnimationState.SHOW_RESULT), 600);
          break;
        case AnimationState.SHOW_RESULT:
          timeout = setTimeout(() => setState(AnimationState.RESET), 2000);
          break;
        case AnimationState.RESET:
          timeout = setTimeout(() => setState(AnimationState.MOVE_TO_SOURCE), 500);
          break;
      }
    };

    runStep();
    return () => clearTimeout(timeout);
  }, [state]);

  // Animation Styles based on state
  const getCursorPosition = () => {
    switch (state) {
      case AnimationState.IDLE: return 'top-[80%] left-[50%]';
      case AnimationState.MOVE_TO_SOURCE: return 'top-[25%] left-[20%]'; // Over source text
      case AnimationState.HIGHLIGHT_TEXT: return 'top-[25%] left-[10%]'; // Dragged across
      case AnimationState.RIGHT_CLICK_SOURCE: return 'top-[25%] left-[15%]';
      case AnimationState.CLICK_COPY: return 'top-[35%] left-[12%]'; // Over "Copy" menu item (approx)
      case AnimationState.MOVE_TO_TARGET: return 'top-[75%] left-[15%]'; // Over target box
      case AnimationState.RIGHT_CLICK_TARGET: return 'top-[75%] left-[15%]';
      case AnimationState.CLICK_PASTE: return 'top-[85%] left-[12%]'; // Over "Paste" menu item (approx)
      case AnimationState.SHOW_RESULT: return 'top-[90%] left-[90%]'; // Move away
      case AnimationState.RESET: return 'top-[90%] left-[90%]';
      default: return 'top-[50%] left-[50%]';
    }
  };

  const isMenuOpen = (type: 'source' | 'target') => {
    if (type === 'source') {
      return state === AnimationState.RIGHT_CLICK_SOURCE || state === AnimationState.CLICK_COPY;
    }
    if (type === 'target') {
      return state === AnimationState.RIGHT_CLICK_TARGET || state === AnimationState.CLICK_PASTE;
    }
    return false;
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-64 bg-gray-100 rounded-xl border-2 border-gray-300 shadow-inner overflow-hidden mb-8" aria-hidden="true">
      {/* Label */}
      <div className="absolute top-2 right-2 text-xs text-gray-500 font-bold bg-white px-2 py-1 rounded">הדגמה (אנימציה)</div>

      {/* Source Area */}
      <div className="absolute top-8 right-8 left-8 h-20 bg-white border border-blue-200 rounded p-3 flex items-center shadow-sm">
        <span className={`text-lg transition-colors duration-300 px-1 rounded ${
          [AnimationState.HIGHLIGHT_TEXT, AnimationState.RIGHT_CLICK_SOURCE, AnimationState.CLICK_COPY].includes(state) 
            ? 'bg-blue-200' 
            : ''
        }`}>
          טקסט לדוגמה
        </span>
        
        {/* Source Context Menu */}
        {isMenuOpen('source') && (
          <div className="absolute top-8 left-20 bg-white border border-gray-300 shadow-lg rounded py-1 z-20 w-32 text-sm">
             <div className="px-4 py-1 hover:bg-gray-100 text-gray-400">גזור</div>
             <div className={`px-4 py-1 ${state === AnimationState.CLICK_COPY ? 'bg-blue-600 text-white' : 'text-gray-800'}`}>העתק</div>
             <div className="px-4 py-1 hover:bg-gray-100 text-gray-400">הדבק</div>
          </div>
        )}
      </div>

      {/* Target Area */}
      <div className="absolute bottom-8 right-8 left-8 h-20 bg-white border-2 border-dashed border-gray-300 rounded p-3 flex items-center shadow-sm">
        {(state === AnimationState.SHOW_RESULT || state === AnimationState.RESET) ? (
           <span className="text-lg text-gray-800">טקסט לדוגמה</span>
        ) : (
          <span className="text-gray-400 text-sm">המקום הריק...</span>
        )}

        {/* Target Context Menu */}
        {isMenuOpen('target') && (
          <div className="absolute top-8 left-20 bg-white border border-gray-300 shadow-lg rounded py-1 z-20 w-32 text-sm">
             <div className="px-4 py-1 hover:bg-gray-100 text-gray-400">גזור</div>
             <div className="px-4 py-1 hover:bg-gray-100 text-gray-400">העתק</div>
             <div className={`px-4 py-1 ${state === AnimationState.CLICK_PASTE ? 'bg-blue-600 text-white' : 'text-gray-800'}`}>הדבק</div>
          </div>
        )}
      </div>

      {/* Cursor */}
      <div 
        className={`absolute w-6 h-6 z-50 transition-all duration-700 ease-in-out ${getCursorPosition()}`}
      >
        <CursorIcon className="w-full h-full drop-shadow-md" />
        {/* Click Indicator */}
        {(state === AnimationState.CLICK_COPY || state === AnimationState.CLICK_PASTE || state === AnimationState.RIGHT_CLICK_SOURCE || state === AnimationState.RIGHT_CLICK_TARGET) && (
          <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full border-2 border-red-500 animate-ping opacity-75"></div>
        )}
      </div>
    </div>
  );
};