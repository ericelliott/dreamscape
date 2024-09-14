import { describe, test } from 'vitest';
import { assert } from 'riteway/vitest';
import {
  AudioControlsDux,
  updateBinauralBeats,
  updateReverb,
  updateNoise,
  updateMixerChannel,
  setPlaybackState,
  setMasterVolume,
  getBinauralBeats,
  getReverb,
  getNoise,
  getMixerChannels,
  getMixerChannel,
  getPlaybackState,
  getMasterVolume,
  reducer
} from './mixer.dux.js';

const { initialState, slice } = AudioControlsDux;

describe('AudioControlsDux', () => {
  test('updateBinauralBeats', () => {
    const newValues = {
      carrierFrequency: 440,
      beatFrequency: 2,
      spread: 0.8
    };
    const nextState = reducer(initialState, updateBinauralBeats(newValues));

    assert({
      given: 'initial state and new binaural beats values',
      should: 'update binaural beats settings',
      actual: getBinauralBeats(nextState),
      expected: newValues
    });
  });

  test('updateReverb', () => {
    const newValues = {
      roomDepth: 0.8,
      damping: 0.3,
      roomWidth: 0.6
    };
    const nextState = reducer(initialState, updateReverb(newValues));

    assert({
      given: 'initial state and new reverb values',
      should: 'update reverb settings',
      actual: getReverb(nextState),
      expected: newValues
    });
  });

  test('updateNoise', () => {
    const newValues = {
      spread: 0.7,
      pan: 0.5
    };
    const nextState = reducer(initialState, updateNoise(newValues));

    assert({
      given: 'initial state and new noise values',
      should: 'update noise settings',
      actual: getNoise(nextState),
      expected: newValues
    });
  });

  test('updateMixerChannel', () => {
    const channelName = 'binauralBeats';
    const newValues = {
      volume: 0.7,
      pan: 0.3,
      stereoWidth: 0.9,
      reverbSend: 0.8
    };
    const nextState = reducer(initialState, updateMixerChannel({ channelName, ...newValues }));

    assert({
      given: 'initial state and new mixer channel values',
      should: 'update the specified mixer channel',
      actual: getMixerChannel(nextState, channelName),
      expected: newValues
    });
  });

  test('setPlaybackState', () => {
    const isPlaying = true;
    const nextState = reducer(initialState, setPlaybackState(isPlaying));

    assert({
      given: 'initial state and new playback state',
      should: 'update the playback state',
      actual: getPlaybackState(nextState),
      expected: isPlaying
    });
  });

  test('setMasterVolume', () => {
    const newVolume = 0.8;
    const nextState = reducer(initialState, setMasterVolume(newVolume));

    assert({
      given: 'initial state and new master volume',
      should: 'update the master volume',
      actual: getMasterVolume(nextState),
      expected: newVolume
    });
  });

  test('getMixerChannels', () => {
    assert({
      given: 'initial state',
      should: 'return all mixer channels',
      actual: Object.keys(getMixerChannels(initialState)),
      expected: ['binauralBeats', 'brownNoise', 'pinkNoise', 'whiteNoise']
    });
  });
});