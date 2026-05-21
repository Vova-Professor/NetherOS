const FS = {
    '/': [
        {name: "Desktop", type: "folder", icon: "desktop", date: 'May 13 2026'},
        {name: "Music", type: "folder", icon: "music_folder", date: 'May 13 2026'},
        {name: "Documents", type: "folder", icon: "folder", date: 'May 13 2026'}
    ],
    '/DiskA/Users/Vova-Professor': [
        {name: "Desktop", type: "folder", icon: "desktop", date: 'May 13 2026'},
        {name: "Documents", type: "folder", icon: "folder", date: 'May 13 2026'},
        {name: "Music", type: "folder", icon: "music_folder", date: 'May 13 2026'},
    ],
    '/Desktop': [],
    '/Trash': [],
    '/Documents': [],
    '/DiskA': [
        {name: "Users", type: "folder", icon: "folder", date: 'May 13 2026'},
        {name: "System", type: "folder", icon: "folder", date: 'May 13 2026'}
    ],
    '/DiskA/Users': [
        {name: "Vova-Professor", type: "folder", icon: "folder", date: 'May 13 2026'}
    ],
    '/DiskA/System': [
        {name: "Apps", type: "folder", icon: "folder", date: 'May 13 2026'},
        {name: "Library", type: "folder", icon: "folder", date: 'May 13 2026'},
        {name: "Fonts", type: "folder", icon: "folder", date: 'May 13 2026'},
        {name: "Drivers", type: "folder", icon: "folder", date: 'May 13 2026'},
        {name: "Logs", type: "folder", icon: "folder", date: 'May 13 2026'},
        {name: "Temp", type: "folder", icon: "folder", date: 'May 13 2026'}
    ],
    '/DiskA/System/Apps': [
        {name: "FileExplorer.nethe", type: "file", img: "../../imgs/Folder.png", icon: "file", date: 'May 13 2026'},
        {name: "Settings.nethe", type: "file", img: "../../../../imgs/APPS/AppIcons/cb.png", icon: "file", date: 'May 13 2026'},
        {name: "CraftShell.nethe", type: "file", img: "../../../../imgs/APPS/AppIcons/cr.png", icon: "file", date: 'May 13 2026'},
        {name: "Terminal.nethe", type: "file", img: "../../../../imgs/APPS/AppIcons/console.jpg", icon: "file", date: 'May 13 2026'},
    ]
}

const aliases = {
  '/Vova-Professor': '/DiskA/Users/Vova-Professor',
};

function getFolder(path) {
  const resolved = aliases[path] ?? path;
  return FS[resolved] ?? [];
}