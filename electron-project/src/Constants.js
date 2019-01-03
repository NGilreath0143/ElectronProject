export default class Constants {
	static VideoSources = {
		YouTube: 0,
		Vimeo: 1
	}
	static YouTube = {
		PlayerStates: {
			Unstarted: -1,
			Ended: 0,
			Playing: 1,
			Paused: 2,
			Buffering: 3,
			VideoCued: 5
		}
	}
	static VideoMonitor = {
		Statuses: {
			Initial: 0,
			PageUnfocused: 1,
			ScreenshotAttempted: 2
		}
	}
	static Keyboard = {
		KeyCodes: {
			Enter: 13,
			PrintScreen: 44
		}
	}
}