import { Component, OnInit } from "@angular/core";
import { File, FileEntry } from "@ionic-native/file/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { Platform } from "@ionic/angular";
import { MediaCapture, MediaFile } from "@ionic-native/media-capture/ngx";

const MEDIA_FOLDER = "ionic_audio";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  audio: MediaObject;
  recording: boolean = false;
  // recordingPaused: boolean = false;
  // audioList: any[] = [];
  files: any[] = [];

  constructor(
    private media: Media,
    private file: File,
    private plt: Platform,
    private mediaCapture: MediaCapture
  ) {}

  // ionViewWillEnter() {
  //   if (localStorage.getItem("audiolist")) {
  //     this.audioList = JSON.parse(localStorage.getItem("audiolist"));
  //   }
  // }

  // createFileName() {
  //   let name = this.plt.is("ios")
  //     ? Math.random().toString(36).substring(7) + ".m4a"
  //     : Math.random().toString(36).substring(7) + ".mp3";
  //   return name;
  // }

  // createFilePath() {
  //   let path: string;

  //   if (this.plt.is("android")) {
  //     path =
  //       this.file.externalDataDirectory.replace(/^file:\/\//, "") +
  //       this.createFileName();
  //   } else if (this.plt.is("ios")) {
  //     path =
  //       this.file.documentsDirectory.replace(/^file:\/\//, "") +
  //       this.createFileName();
  //   } else if (this.plt.is("hybrid")) {
  //     path =
  //       this.file.dataDirectory.replace(/^filesystem:file:\/\//, "") +
  //       this.createFileName();
  //   }

  //   return path;
  // }

  ngOnInit() {
    // this.plt.ready().then(() => {
    //   let path = this.file.dataDirectory;
    //   this.file.checkDir(path, MEDIA_FOLDER).then(
    //     () => {
    //       this.loadFiles();
    //     },
    //     (err) => {
    //       this.file.createDir(path, MEDIA_FOLDER, false);
    //     }
    //   );
    // });
  }

  ionViewWillEnter() {
    if (localStorage.getItem("files")) {
      this.files = JSON.parse(localStorage.getItem("files"));
    }
  }

  loadFiles() {
    this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER).then(
      (res) => {
        this.files = res;
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  recordAudio() {
    // let path: string;
    // let name: string = this.plt.is("ios")
    //   ? Math.random().toString(36).substring(7) + ".m4a"
    //   : Math.random().toString(36).substring(7) + ".mp3";

    // if (this.plt.is("android")) {
    //   path = this.file.externalDataDirectory.replace(/^file:\/\//, "") + name;
    // } else if (this.plt.is("ios")) {
    //   path = this.file.documentsDirectory.replace(/^file:\/\//, "") + name;
    // } else if (this.plt.is("hybrid")) {
    //   path = this.file.dataDirectory.replace(/^file:\/\//, "") + name;
    // }

    // this.file.createFile(this.file.dataDirectory, name, true).then((res) => {
    //   this.audio = this.media.create(path);
    //   this.audio.startRecord();

    //   console.log(res);
    // });

    // // this.audio = this.media.create(path);
    // console.log(this.audio);
    // this.recording = true;

    this.mediaCapture.captureAudio().then(
      (data: MediaFile[]) => {
        if (data.length > 0) {
          // this.copyFileToLocalDir(data[0].fullPath);

          this.files.push(data[0]);
          localStorage.setItem("files", JSON.stringify(this.files));

          console.log(this.files);
        }

        console.log(data);
      },
      (err) => console.log(err)
    );
  }

  // copyFileToLocalDir(fullpath) {
  //   let path = fullpath;
  //   console.log("fullpath", path);

  //   if (fullpath.indexOf("file://") < 0) {
  //     path = "file://" + fullpath;
  //   }

  //   const ext = path.split(".").pop();
  //   const d = Date.now();
  //   const newName = `${d}.${ext}`;

  //   const name = path.substr(path.lastIndexOf("/") + 1);
  //   const copyFrom = path.substr(0, path.lastIndexOf("/") + 1);
  //   const copyTo = this.file.dataDirectory + MEDIA_FOLDER;

  //   console.log(name, copyFrom, copyTo);

  //   this.file.copyFile(copyFrom, name, copyTo, newName).then(
  //     (success) => {
  //       this.loadFiles();
  //     },
  //     (err) => console.log(err)
  //   );
  // }

  stopRecording() {
    // this.audio.stopRecord();
    // this.audio.release();
    // console.log(this.audio.getDuration());
    // // let data = {
    // //   name: this.audio.,
    // //   path: this.path,
    // // };
    // // this.audioList.push(data);
    // // localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    // this.recording = false;
  }

  pauseRecording() {
    // this.audio.pauseRecord();
    // this.recordingPaused = true;
  }

  resumeRecording() {
    // this.audio.resumeRecord();
    // this.recordingPaused = false;
  }

  playAudio(f: FileEntry) {
    // let path: string;

    // if (this.plt.is("android")) {
    //   path = this.file.externalDataDirectory.replace(/^file:\/\//, "") + name;
    // } else if (this.plt.is("ios")) {
    //   path = this.file.documentsDirectory.replace(/^file:\/\//, "") + name;
    // } else if (this.plt.is("hybrid")) {
    //   path =
    //     this.file.dataDirectory.replace(/^filesystem:file:\/\//, "") + name;
    // }

    // this.audio = this.media.create(path);
    // this.audio.play();

    const path = f.fullPath.replace(/^file:\/\//, "");
    console.log(path);
    this.audio = this.media.create(path);
    this.audio.play();
  }

  pauseAudio(f: FileEntry) {
    // let path: string;
    // if (this.plt.is("android")) {
    //   path = this.file.externalDataDirectory.replace(/^file:\/\//, "") + name;
    //   this.audio = this.media.create(path);
    // } else if (this.plt.is("ios")) {
    //   path = this.file.documentsDirectory.replace(/^file:\/\//, "") + name;
    //   this.audio = this.media.create(path);
    // } else if (this.plt.is("hybrid")) {
    //   path = this.file.dataDirectory.replace(/^file:\/\//, "") + name;
    //   this.audio = this.media.create(path);
    // }
    // this.audio.pause();

    const path = f.fullPath.replace(/^file:\/\//, "");
    this.audio = this.media.create(path);
    this.audio.pause();
  }

  deleteAudio(f: FileEntry, i: number) {
    this.files.splice(i, 1);
    localStorage.setItem("audiolist", JSON.stringify(this.files));

    const path = f.fullPath.substr(0, f.fullPath.lastIndexOf("/") + 1);
    this.file.removeFile(path.replace("%20", " "), f.name).then(
      () => {
        this.loadFiles();
      },
      (err) => console.log(err)
    );
  }

  // deleteAll() {
  //   // this.audioList = [];
  //   // localStorage.setItem("audiolist", JSON.stringify(this.audioList));
  // }
}
