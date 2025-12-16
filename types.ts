import React from 'react';

export interface Step {
  id: number;
  text: string;
  icon: React.ReactNode;
}

export enum AnimationState {
  IDLE,
  MOVE_TO_SOURCE,
  HIGHLIGHT_TEXT,
  RIGHT_CLICK_SOURCE,
  CLICK_COPY,
  MOVE_TO_TARGET,
  RIGHT_CLICK_TARGET,
  CLICK_PASTE,
  SHOW_RESULT,
  RESET
}