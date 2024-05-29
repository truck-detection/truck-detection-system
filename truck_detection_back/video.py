import requests
import urllib
import json
import pandas as pd
import cv2
import os

key = "76d7fc2bfa1f42548ba02eb3c43baf57"
url_cctv = f'https://openapi.its.go.kr:9443/cctvInfo?apiKey=76d7fc2bfa1f42548ba02eb3c43baf57&type=ex&cctvType=1&minX=126.800000&maxX=127.890000&minY=34.900000&maxY=35.100000&getType=json'
response = urllib.request.urlopen(url_cctv)
json_str = response.read().decode('utf-8')
json_object = json.loads(json_str)
cctv_play = pd.json_normalize(json_object["response"]["data"], sep=',')
print(cctv_play)

DoDang_url = cctv_play['cctvurl'][0]
SeoUn_url = cctv_play['cctvurl'][1]
Bucheon_url = cctv_play['cctvurl'][2]
airport_30k = cctv_play['cctvurl'][3]
Kimpo = cctv_play['cctvurl'][4]

# 저장할 디렉토리 경로
directory_path = 'C:\\Users\\USER\\Videos\\DoDang_frames'

# 프레임을 저장할 디렉토리를 생성
try:
    if not os.path.exists(directory_path):
        os.makedirs(directory_path)
except OSError:
    print('Error: Creating directory. ' + directory_path)

# 여기 괄호안에 보고싶은 cctv의 이름 넣기 ex) Bucheon_url, Kimpo 등등
capture = cv2.VideoCapture(Bucheon_url) 

frame_number = 0
second_count = 0
fps = capture.get(cv2.CAP_PROP_FPS)

while capture.isOpened():
    ret, frame = capture.read()
    if not ret:
        print("[프레임 수신 불가] - 종료합니다")
        break

    # 매 1초마다 프레임 저장
    if frame_number % int(fps) == 0:
        frame_filename = os.path.join(directory_path, f'frame_{second_count:05d}.jpg')
        cv2.imwrite(frame_filename, frame)
        second_count += 1
    
    frame_number += 1
    
    # 프레임을 윈도우에 표시
    cv2.imshow('video', frame)
    
    # 키보드에서 q를 누르면 동영상 닫기
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

capture.release()
cv2.destroyAllWindows()

print(cv2.__version__)
