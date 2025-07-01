import { FaPlus, FaStar } from "react-icons/fa6";

const _ = {};

_.sidebarOpts = [
  {
    label: 'New Note',
    colorClass: 'bg-purple-500',
    icon: FaPlus
  },
  {
    label: 'Starred Notes',
    colorClass: 'bg-orange-400',
    icon: FaStar
  }
]

_.mockNoteData = [
  {
    date: 'Thu Jun 19 2025',
    title: 'This is my first note on QuikTake, tetur qui cupidatat et velit et elit. Esse non laboris commodo et. Quis.',
    desc: 'Exercitation tempor velit anim sit labore. Laborum sit consectetur cupidatat nisi. Nostrud est in anim fugiat elit consectetur ea consectetur qui cupidatat et velit et elit. Esse non laboris commodo et. Quis consequat qui sit velit. Duis ipsum irure laboris incididunt enim adipisicing eu aute. Id ipsum ipsum id elit.',
    photoUrls: ['https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg', 'https://hips.hearstapps.com/hmg-prod/images/ginger-maine-coon-kitten-running-on-lawn-in-royalty-free-image-1719608142.jpg?crop=1xw:0.84415xh;0,0.185xh&resize=1200:*'],
    bgColor: 'bg-blue-500',
    isStarred: true
  }
]

_.noteColors = ['bg-purple-500', 'bg-blue-500', 'bg-red-700', 'bg-amber-700', 'bg-cyan-800']

export default _