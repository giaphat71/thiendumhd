#fullscreen.py

import win32gui
import win32con
processName = "tym.exe"
def main():
    hwnd = win32gui.FindWindow(None, "Revelation Mobile")
    print(hwnd)
    # set window to fullscreen no border
    orgStyle = win32gui.GetWindowLong(hwnd, win32con.GWL_STYLE)
    newStyle = orgStyle & ~win32con.WS_CAPTION & ~win32con.WS_THICKFRAME
    win32gui.SetWindowLong(hwnd, win32con.GWL_STYLE, newStyle)
    win32gui.SetWindowPos(hwnd, win32con.HWND_TOP, 0, 0, 0, 0, win32con.SWP_NOMOVE | win32con.SWP_NOSIZE | win32con.SWP_NOZORDER | win32con.SWP_FRAMECHANGED)
    # set window to fullscreen with border



if __name__ == '__main__':
    main()