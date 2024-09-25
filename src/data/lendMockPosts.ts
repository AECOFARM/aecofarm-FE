const lendMockPosts: Post[] = [
  {
    contractId: 1,
    itemId: 201,
    itemName: "파워 드릴",
    itemPlace: "서울",
    price: 10,
    time: 24,
    contractTime: 48,
    itemHash: ["공구", "DIY"],
    likeStatus: true,
    donateStatus: false,
    distance: 1.5,
    lowPrice: 5,
    highPrice: 20,
  },
  {
    contractId: 2,
    itemId: 202,
    itemName: "전자 피아노",
    itemPlace: "부산",
    price: 0,
    time: 12,
    contractTime: 72,
    itemHash: ["음악", "악기"],
    likeStatus: false,
    donateStatus: true,
    distance: 2.0,
    lowPrice: 0,
    highPrice: 10,
  },
];

export default lendMockPosts;
