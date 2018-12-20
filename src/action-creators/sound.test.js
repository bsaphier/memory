import { SourceManager } from './sound';

const mockSourceData = { name: 'mockSource', data: [1, 2, 3] };

test('Test SourceManager.addSource stores data in its instance', () => {
  const sourceManager = new SourceManager();
  sourceManager.addSource(mockSourceData);
  expect(sourceManager[mockSourceData.name]).toBe(mockSourceData.data);
});

test('Test SourceManager.playSound returns a function', () => {
  const sourceManager = new SourceManager();
  sourceManager[mockSourceData.name] = mockSourceData.data;
  expect(typeof sourceManager.playSound(mockSourceData.name)).toBe('function');
});

test('Test the function returned by SourceManager.playSound: ', () => {
  let audioEvent;
  let audioCtxMock;
  let sourceNodeSpy;
  let AudioContextMock;
  let AudioBufferSourceNodeMock;

  beforeEach(() => {
    jest.clearAllMocks();
    AudioBufferSourceNodeMock = () => {
      this.buffer = null;
      this.connect = jest.fn();
      this.start = jest.fn();
      this.stop = jest.fn();
      return this;
    };
    AudioContextMock = () => {
      this.currentTime = 0;
      this.destination = {};
      this.createBufferSource = jest.fn().mockImplementation(() => {
        const mockSourceNode = new AudioBufferSourceNodeMock();
        sourceNodeSpy = mockSourceNode; // now we spy on this mocked node when it is created
        return mockSourceNode;
      });
      this.decodeAudioData = jest
        .fn()
        .mockImplementation(arrBuff => new Promise(res => res(arrBuff)));
      return this;
    };
    const sourceManager = new SourceManager();
    sourceManager[mockSourceData.name] = mockSourceData.data;
    audioEvent = sourceManager.playSound(mockSourceData.name);
    audioCtxMock = new AudioContextMock();
  });

  test('calls AudioContext.createBufferSource', () => {
    // audio event receives two args, as defined by: https://bsaphier.github.io/react-redux-webaudio/
    audioEvent(audioCtxMock, () => audioCtxMock.currentTime);
    expect(audioCtxMock.createBufferSource).toHaveBeenCalled();
  });

  test('calls AudioContext.decodeAudioData with a copy of the source data', () => {
    audioEvent(audioCtxMock, () => audioCtxMock.currentTime);
    expect(audioCtxMock.decodeAudioData).toHaveBeenCalled();
    expect(audioCtxMock.decodeAudioData.mock.calls[0][0]).toEqual(mockSourceData.data);
    expect(audioCtxMock.decodeAudioData.mock.calls[0][0]).not.toBe(mockSourceData.data);
  });

  test('calls AudioBufferSourceNode.connect', () => {
    audioEvent(audioCtxMock, () => audioCtxMock.currentTime);
    expect(sourceNodeSpy.connect).toHaveBeenCalled();
  });

  test('calls AudioBufferSourceNode.start at 0 time', () => {
    audioEvent(audioCtxMock, () => audioCtxMock.currentTime);
    expect(sourceNodeSpy.start).toHaveBeenCalledWith(0);
  });

  test('calls AudioBufferSourceNode.stop with a time in the future', () => {
    const getCurrentTimeStub = jest.fn().mockImplementation(() => audioCtxMock.currentTime);
    audioEvent(audioCtxMock, getCurrentTimeStub);
    expect(getCurrentTimeStub).toHaveBeenCalled();
    expect(sourceNodeSpy.stop.mock.calls[0][0]).toBeGreaterThan(audioCtxMock.currentTime);
  });
});
