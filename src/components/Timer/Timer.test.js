import { formatTime } from './Timer';

describe('formatTime', () => {
  it('invalid time ', () => {
    expect(formatTime(-1)).toBe('--:--');
  });
  
  it('time = 0', () => {
    expect(formatTime(0)).toBe('0:00');
  });
  
  it('time < 1min', () => {
    expect(formatTime(55)).toBe('0:55');
  });
  
  it('1min < time < 1hr', () => {
    expect(formatTime(65)).toBe('1:05');
  });
  
  it('time > 1hr', () => {
    expect(formatTime(3601)).toBe('1:00:01');
  });
});
