/*! @license
 * Shaka Player
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @externs
 * @suppress {duplicate} To prevent compiler errors with the namespace
 *   being declared both here and by goog.provide in the library.
 */

/** @namespace */
var shaka = {};

/** @namespace */
shaka.extern = {};

/**
 * @struct
 * @implements {shaka.util.IDestroyable}
 * @extends {shaka.util.FakeEventTarget}
 * @export
 *
 */
shaka.extern.Player = class {
  /**
   * Get the range of time (in seconds) that seeking is allowed. If the player has
   * not loaded content, this will return a range from 0 to 0.
   * @param {boolean=} real
   * @return {{start: number, end: number}}
   *
   */
  seekRange(real) {}

  /**
   * Get if the player is playing live content. If the player has not loaded
   * content, this will return |false|.
   *
   * @return {boolean}
   *
   */
  isLive() {}

  /**
   * Check if the player is currently in a buffering state (has too little content
   * to play smoothly). If the player has not loaded content, this will return
   * |false|.
   *
   * @return {boolean}
   *
   */
  isBuffering() {}

  /**
   * Cancel trick-play. If the player has not loaded content or is still loading
   * content this will be a no-op.
   *
   *
   */
  cancelTrickPlay() {}

  /**
   * After destruction, a Player object cannot be used again.
   *
   * @override
   *
   */
  destroy() {}

  /**
   * Tell the player to load the content at |assetUri| and start playback at
   * |startTime|. Before calling |load|, a call to |attach| must have succeeded.
   *
   * Calls to |load| will interrupt any in-progress calls to |load| but cannot
   * interrupt calls to |attach|, |detach|, or |unload|.
   *
   * @param {string} assetUri
   * @param {?number=} startTime
   *    When |startTime| is |null| or |undefined|, playback will start at the
   *    default start time (startTime=0 for VOD and startTime=liveEdge for LIVE).
   * @param {string|shaka.extern.ManifestParser.Factory=} mimeType
   * @return {!Promise}
   *
   */
  load(assetUri, startTime, mimeType) {}

  /**
   * Return a copy of the current configuration.  Modifications of the returned
   * value will not affect the Player's active configuration.  You must call
   * player.configure() to make changes.
   *
   * @return {shaka.extern.PlayerConfiguration}
   */
  getConfiguration() {}

  /**
   * Get the current playhead position as a date. This should only be called when
   * the player has loaded a live stream. If the player has not loaded a live
   * stream, this will return |null|.
   *
   * @return {Date}
   */
  getPlayheadTimeAsDate() {}

  /**
   * Check if the text displayer is enabled.
   *
   * @return {boolean}
   */
  isTextTrackVisible() {}

  /**
   * Enable or disable the text displayer.  If the player is in an unloaded state,
   * the request will be applied next time content is loaded.
   *
   * @param {boolean} isVisible
   * @return {!Promise}
   */
  setTextTrackVisibility(isVisible) {}

  /**
   * Return a list of variant tracks that can be switched to in the current
   * period. If there are multiple periods, you must seek to the period in order
   * to get variants from that period.
   *
   * If the player has not loaded content, this will return an empty list.
   *
   * @return {!Array.<shaka.extern.Track>}
   */
  getVariantTracks() {}

  /**
   * Check if the manifest contains only audio-only content. If the player has not
   * loaded content, this will return |false|.
   *
   * The player does not support content that contain more than one type of
   * variants (i.e. mixing audio-only, video-only, audio-video). Content will be
   * filtered to only contain one type of variant.
   *
   * @return {boolean}
   */
  isAudioOnly() {}

  /**
   * Return a list of text tracks that can be switched to in the current period.
   * If there are multiple periods, you must seek to a period in order to get
   * text tracks from that period.
   *
   * If the player has not loaded content, this will return an empty list.
   *
   * @export
   */
  getTextTracks() {}

  /**
   * Add an event listener to this object.
   *
   * @param {string} type The event type to listen for.
   * @param {shaka.util.FakeEventTarget.ListenerType} listener The callback or
   *   listener object to invoke.
   * @param {(!AddEventListenerOptions|boolean)=} options Ignored.
   * @override
   */
  addEventListener(type, listener, options) {}

  /**
   * Remove an event listener from this object.
   *
   * @param {string} type The event type for which you wish to remove a listener.
   * @param {shaka.util.FakeEventTarget.ListenerType} listener The callback or
   *   listener object to remove.
   * @param {(EventListenerOptions|boolean)=} options Ignored.
   * @override
   */
  removeEventListener(type, listener, options) {}

  /**
   * Dispatch an event from this object.
   *
   * @param {!Event} event The event to be dispatched from this object.
   * @return {boolean} True if the default action was prevented.
   * @override
   */
  dispatchEvent(event) {}

  /**
   * Returns a shaka.ads.AdManager instance, responsible for Dynamic
   * Ad Insertion functionality.
   *
   * @return {shaka.extern.IAdManager}
   * @export
   */
  getAdManager() {}
};

/**
 * @typedef {{
 *   base: string,
 *   buffered: string,
 *   played: string,
 *   adBreaks: string
 * }}
 *
 * @property {string} base
 *   The CSS background color applied to the base of the seek bar, on top of
 *   which the buffer level and playback position are shown.
 * @property {string} buffered
 *   The CSS background color applied to the portion of the seek bar showing
 *   what has been buffered ahead of the playback position.
 * @property {string} played
 *   The CSS background color applied to the portion of the seek bar showing
 *   what has been played already.
 * @property {string} adBreaks
 *   The CSS background color applied to the portion of the seek bar showing
 *   when the ad breaks are scheduled to occur on the timeline.
 * @exportDoc
 */
shaka.extern.UISeekBarColors;

/**
 * @typedef {{
 *   base: string,
 *   level: string
 * }}
 *
 * @property {string} base
 *   The CSS background color applied to the base of the volume bar, on top of
 *   which the volume level is shown.
 * @property {string} level
 *   The CSS background color applied to the portion of the volume bar showing
 *   the volume level.
 * @exportDoc
 */
shaka.extern.UIVolumeBarColors;

/**
 * @description
 * The UI's configuration options.
 *
 * @typedef {{
 *   controlPanelElements: !Array.<string>,
 *   overflowMenuButtons: !Array.<string>,
 *   addSeekBar: boolean,
 *   addBigPlayButton: boolean,
 *   castReceiverAppId: string,
 *   clearBufferOnQualityChange: boolean,
 *   showUnbufferedStart: boolean,
 *   seekBarColors: shaka.extern.UISeekBarColors,
 *   volumeBarColors: shaka.extern.UIVolumeBarColors,
 *   trackLabelFormat: shaka.ui.Overlay.TrackLabelFormat,
 *   fadeDelay: number,
 *   doubleClickForFullscreen: boolean,
 *   enableKeyboardPlaybackControls: boolean,
 *   enableFullscreenOnRotation: boolean,
 *   forceLandscapeOnFullscreen: boolean
 * }}
 *
 * @property {!Array.<string>} controlPanelElements
 *   The ordered list of control panel elements of the UI.
 * @property {!Array.<string>} overflowMenuButtons
 *   The ordered list of the overflow menu buttons.
 * @property {boolean} addSeekBar
 *   Whether or not a seek bar should be part of the UI.
 * @property {boolean} addBigPlayButton
 *   Whether or not a big play button in the center of the video
 *   should be part of the UI.
 * @property {string} castReceiverAppId
 *   Receiver app id to use for the Chromecast support.
 * @property {boolean} clearBufferOnQualityChange
 *   Only applicable if the resolution selection is part of the UI.
 *   Whether buffer should be cleared when changing resolution
 *   via UI. Clearing buffer would result in immidiate change of quality,
 *   but playback may flicker/stall for a sec as the content in new
 *   resolution is being buffered. Not clearing the buffer will mean
 *   we play the content in the previously selected resolution that we
 *   already have buffered before switching to the new resolution.
 * @property {boolean} showUnbufferedStart
 *   If true, color any unbuffered region at the start of the seek bar as
 *   unbuffered (using the "base" color).  If false, color any unbuffered region
 *   at the start of the seek bar as played (using the "played" color).
 *   <br>
 *   A value of false matches the default behavior of Chrome's native controls
 *   and Shaka Player v3.0+.
 *   <br>
 *   A value of true matches the default behavior of Shaka Player v2.5.
 *   <br>
 *   Defaults to false.
 * @property {shaka.extern.UISeekBarColors} seekBarColors
 *   The CSS colors applied to the seek bar.  This allows you to override the
 *   colors used in the linear gradient constructed in JavaScript, since you
 *   cannot easily do this in pure CSS.
 * @property {shaka.extern.UIVolumeBarColors} volumeBarColors
 *   The CSS colors applied to the volume bar.  This allows you to override the
 *   colors used in the linear gradient constructed in JavaScript, since you
 *   cannot do this in pure CSS.
 * @property {shaka.ui.Overlay.TrackLabelFormat} trackLabelFormat
 *   An enum that determines what is shown in the labels for text track and
 *   audio variant selection.
 *   LANGUAGE means that only the language of the item is shown.
 *   ROLE means that only the role of the item is shown.
 *   LANGUAGE_ROLE means both language and role are shown, or just language if
 *   there is no role.
 *   LABEL means the non-standard DASH "label" attribute or the HLS "NAME"
 *   attribute are shown.
 *   Defaults to LANGUAGE.
 * @property {number} fadeDelay
 *   The delay (in seconds) before fading out the controls once the user stops
 *   interacting with them.  We recommend setting this to 3 on your cast
 *   receiver UI.
 *   Defaults to 0.
 * @property {boolean} doubleClickForFullscreen
 *   Whether or not double-clicking on the UI should cause it to enter
 *   fullscreen.
 *   Defaults to true.
 * @property {boolean} enableKeyboardPlaybackControls
 *   Whether or not playback controls via keyboard is enabled, such as seek
 *   forward, seek backward, jump to the beginning/end of the video.
 *   Defaults to true.
 * @property {boolean} enableFullscreenOnRotation
 *   Whether or not to enter/exit fullscreen mode when the screen is rotated.
 *   Defaults to true.
 * @property {boolean} forceLandscapeOnFullscreen
 *   Whether or not the device should rotate to landscape mode when the video
 *   enters fullscreen.  Note that this behavior is based on an experimental
 *   browser API, and may not work on all platforms.
 *   Defaults to true.
 * @exportDoc
 */
shaka.extern.UIConfiguration;


/**
 * Interface for UI elements.  UI elements should inherit from the concrete base
 * class shaka.ui.Element.  The members defined in this extern's constructor are
 * all available from the base class, and are defined here to keep the compiler
 * from renaming them.
 *
 * @extends {shaka.util.IReleasable}
 * @interface
 * @exportDoc
 */
shaka.extern.IUIElement = class {
  /**
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   */
  constructor(parent, controls) {
    /**
     * @protected {HTMLElement}
     * @exportDoc
     */
    this.parent;

    /**
     * @protected {shaka.ui.Controls}
     * @exportDoc
     */
    this.controls;

    /**
     * @protected {shaka.util.EventManager}
     * @exportDoc
     */
    this.eventManager;

    /**
     * @protected {shaka.ui.Localization}
     * @exportDoc
     */
    this.localization;

    /**
     * @protected {shaka.Player|shaka.extern.Player}
     * @exportDoc
     */
    this.player;

    /**
     * @protected {HTMLMediaElement}
     * @exportDoc
     */
    this.video;

    /**
     * @protected {shaka.extern.IAdManager}
     * @exportDoc
     */
    this.adManager;

    /**
     * @protected {shaka.extern.IAd}
     * @exportDoc
     */
    this.ad;
  }

  /**
   * @override
   */
  release() {}
};


/**
 * A factory for creating a UI element.
 *
 * @interface
 * @exportDoc
 */
shaka.extern.IUIElement.Factory = class {
  /**
   * @param {!HTMLElement} rootElement
   * @param {!shaka.ui.Controls} controls
   * @return {!shaka.extern.IUIElement}
   */
  create(rootElement, controls) {}
};


/**
 * Interface for UI range elements.  UI range elements should inherit from the
 * concrete base class shaka.ui.RangeElement.  The members defined in this
 * extern's constructor are all available from the base class, and are defined
 * here to keep the compiler from renaming them.
 *
 * @extends {shaka.extern.IUIElement}
 * @interface
 * @exportDoc
 */
shaka.extern.IUIRangeElement = class {
  /**
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   * @param {!Array.<string>} containerClassNames
   * @param {!Array.<string>} barClassNames
   */
  constructor(parent, controls, containerClassNames, barClassNames) {
    /**
     * @protected {!HTMLElement}
     * @exportDoc
     */
    this.container;

    /**
     * @protected {!HTMLInputElement}
     * @exportDoc
     */
    this.bar;
  }

  /**
   * @param {number} min
   * @param {number} max
   */
  setRange(min, max) {}

  /**
   * Called when user interaction begins.
   * To be overridden by subclasses.
   */
  onChangeStart() {}

  /**
   * Called when a new value is set by user interaction.
   * To be overridden by subclasses.
   */
  onChange() {}

  /**
   * Called when user interaction ends.
   * To be overridden by subclasses.
   */
  onChangeEnd() {}

  /** @return {number} */
  getValue() {}

  /** @param {number} value */
  setValue(value) {}

  /** @param {number} value */
  changeTo(value) {}
};

/**
 * Interface for UI settings menus.  UI settings menus should inherit from the
 * concrete base class shaka.ui.SettingsMenu.  The members defined in this
 * extern's constructor are all available from the base class, and are defined
 * here to keep the compiler from renaming them.
 *
 * @extends {shaka.extern.IUIElement}
 * @interface
 * @exportDoc
 */
shaka.extern.IUISettingsMenu = class {
  /**
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   * @param {string} iconText
   */
  constructor(parent, controls, iconText) {
    /**
     * @protected {!HTMLButtonElement}
     * @exportDoc
     */
    this.button;

    /**
     * @protected {!HTMLElement}
     * @exportDoc
     */
    this.icon;

    /**
     * @protected {!HTMLElement}
     * @exportDoc
     */
    this.nameSpan;

    /**
     * @protected {!HTMLElement}
     * @exportDoc
     */
    this.currentSelection;

    /**
     * @protected {!HTMLElement}
     * @exportDoc
     */
    this.menu;

    /**
     * @protected {!HTMLButtonElement}
     * @exportDoc
     */
    this.backButton;

    /**
     * @protected {!HTMLElement}
     * @exportDoc
     */
    this.backSpan;
  }
};

/**
 * Interface for SeekBars. SeekBars should inherit from the concrete base
 * class shaka.ui.Element. If you do not need to totaly rebuild the
 * SeekBar, you should consider using shaka.ui.RangeElement or
 * shaka.ui.SeekBar as your base class.
 *
 * @extends {shaka.extern.IUIRangeElement}
 * @interface
 * @exportDoc
 */
shaka.extern.IUISeekBar = class {
  /** @return {number} */
  getValue() {}

  /** @param {number} value */
  setValue(value) {}

  /**
   * Called by Controls on a timer to update the state of the seek bar.
   * Also called internally when the user interacts with the input element.
   */
  update() {}

  /** @return {boolean} */
  isShowing() {}
};

/**
 * A factory for creating a SeekBar element.
 *
 * @interface
 * @exportDoc
 */
shaka.extern.IUISeekBar.Factory = class {
  /**
   * @param {!HTMLElement} rootElement
   * @param {!shaka.ui.Controls} controls
   * @return {!shaka.extern.IUISeekBar}
   */
  create(rootElement, controls) {}
};
