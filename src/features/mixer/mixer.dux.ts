import { Reducer } from 'redux';

// Reusable types
type MixerChannelName = 'binauralBeats' | 'brownNoise' | 'pinkNoise' | 'whiteNoise';

interface BinauralBeats {
  carrierFrequency: number;
  beatFrequency: number;
  spread: number;
}

interface Reverb {
  roomDepth: number;
  damping: number;
  roomWidth: number;
}

interface Noise {
  spread: number;
  pan: number;
}

interface MixerChannel {
  volume: number;
  pan: number;
  stereoWidth: number;
  reverbSend: number;
}

interface AudioControlsState {
  binauralBeats: BinauralBeats;
  reverb: Reverb;
  noise: Noise;
  mixerChannels: Record<MixerChannelName, MixerChannel>;
  isPlaying: boolean;
  masterVolume: number;
}

interface Action<T = any> {
  type: string;
  payload: T;
}

// Reusable action function type
type ActionCreator<P> = (payload: P) => Action<P>;

// AudioControlsDux object
export const AudioControlsDux = {
  initialState: {
    binauralBeats: {
      carrierFrequency: 432,
      beatFrequency: 1.5,
      spread: 0.75
    },
    reverb: {
      roomDepth: 0.75,
      damping: 0.25,
      roomWidth: 0.5
    },
    noise: {
      spread: 0.5,
      pan: 0
    },
    mixerChannels: {
      binauralBeats: {
        volume: 0.5,
        pan: 0,
        stereoWidth: 1,
        reverbSend: 1
      },
      brownNoise: {
        volume: 0.25,
        pan: 0,
        stereoWidth: 1,
        reverbSend: 1
      },
      pinkNoise: {
        volume: 0.1,
        pan: 0,
        stereoWidth: 1,
        reverbSend: 1
      },
      whiteNoise: {
        volume: 0.1,
        pan: 0,
        stereoWidth: 1,
        reverbSend: 1
      }
    },
    isPlaying: false,
    masterVolume: 0.75
  } as AudioControlsState,
  slice: 'audioControls' as const
};

// Action Creators
type UpdateBinauralBeats = ActionCreator<Partial<BinauralBeats>>;
export const updateBinauralBeats: UpdateBinauralBeats = (payload = {}) => ({
  type: `${AudioControlsDux.slice}/updateBinauralBeats`,
  payload
});

type UpdateReverb = ActionCreator<Partial<Reverb>>;
export const updateReverb: UpdateReverb = (payload = {}) => ({
  type: `${AudioControlsDux.slice}/updateReverb`,
  payload
});

type UpdateNoise = ActionCreator<Partial<Noise>>;
export const updateNoise: UpdateNoise = (payload = {}) => ({
  type: `${AudioControlsDux.slice}/updateNoise`,
  payload
});

type UpdateMixerChannel = ActionCreator<{ channelName: MixerChannelName } & Partial<MixerChannel>>;
export const updateMixerChannel: UpdateMixerChannel = (payload = { channelName: 'binauralBeats' }) => ({
  type: `${AudioControlsDux.slice}/updateMixerChannel`,
  payload
});

type SetPlaybackState = ActionCreator<boolean>;
export const setPlaybackState: SetPlaybackState = (payload = false) => ({
  type: `${AudioControlsDux.slice}/setPlaybackState`,
  payload
});

type SetMasterVolume = ActionCreator<number>;
export const setMasterVolume: SetMasterVolume = (payload = 0.75) => ({
  type: `${AudioControlsDux.slice}/setMasterVolume`,
  payload
});

// Reducer
export const reducer: Reducer<AudioControlsState, Action> = (state = AudioControlsDux.initialState, action) => {
  switch (action.type) {
    case updateBinauralBeats().type:
      return { ...state, binauralBeats: { ...state.binauralBeats, ...action.payload } };
    case updateReverb().type:
      return { ...state, reverb: { ...state.reverb, ...action.payload } };
    case updateNoise().type:
      return { ...state, noise: { ...state.noise, ...action.payload } };
    case updateMixerChannel().type:
      const { channelName, ...channelUpdates } = action.payload;
      return {
        ...state,
        mixerChannels: {
          ...state.mixerChannels,
          [channelName]: { ...state.mixerChannels[channelName], ...channelUpdates }
        }
      };
    case setPlaybackState().type:
      return { ...state, isPlaying: action.payload };
    case setMasterVolume().type:
      return { ...state, masterVolume: action.payload };
    default:
      return state;
  }
};

// Selectors
type GetBinauralBeats = (state: AudioControlsState) => BinauralBeats;
export const getBinauralBeats: GetBinauralBeats = (state) => state.binauralBeats;

type GetReverb = (state: AudioControlsState) => Reverb;
export const getReverb: GetReverb = (state) => state.reverb;

type GetNoise = (state: AudioControlsState) => Noise;
export const getNoise: GetNoise = (state) => state.noise;

type GetMixerChannels = (state: AudioControlsState) => Record<MixerChannelName, MixerChannel>;
export const getMixerChannels: GetMixerChannels = (state) => state.mixerChannels;

type GetMixerChannel = (state: AudioControlsState, channelName: MixerChannelName) => MixerChannel;
export const getMixerChannel: GetMixerChannel = (state, channelName) => state.mixerChannels[channelName];

type GetPlaybackState = (state: AudioControlsState) => boolean;
export const getPlaybackState: GetPlaybackState = (state) => state.isPlaying;

type GetMasterVolume = (state: AudioControlsState) => number;
export const getMasterVolume: GetMasterVolume = (state) => state.masterVolume;

// Inferred properties
const mapStateToProps = (state: { [AudioControlsDux.slice]: AudioControlsState }) => ({
  binauralBeats: getBinauralBeats(state[AudioControlsDux.slice]),
  reverb: getReverb(state[AudioControlsDux.slice]),
  noise: getNoise(state[AudioControlsDux.slice]),
  mixerChannels: getMixerChannels(state[AudioControlsDux.slice]),
  isPlaying: getPlaybackState(state[AudioControlsDux.slice]),
  masterVolume: getMasterVolume(state[AudioControlsDux.slice])
});

const mapDispatchToProps = {
  updateBinauralBeats,
  updateReverb,
  updateNoise,
  updateMixerChannel,
  setPlaybackState,
  setMasterVolume
};

export const AudioControlsPanel = {
  mapStateToProps,
  mapDispatchToProps
};

// Additional properties that might be inferred
const actions = [updateBinauralBeats, updateReverb, updateNoise, updateMixerChannel, setPlaybackState, setMasterVolume];
const selectors = [getBinauralBeats, getReverb, getNoise, getMixerChannels, getMixerChannel, getPlaybackState, getMasterVolume];

// Export the complete Dux object
export const AudioControlsDuxComplete = {
  ...AudioControlsDux,
  actions,
  selectors,
  reducer,
  mapStateToProps,
  mapDispatchToProps,
  connectedComponentName: 'AudioControlsPanel',
};