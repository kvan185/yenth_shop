import fs from "node:fs";

const levels = ["a1", "a2", "b1", "b2", "c1"];
const levelRank = { a1: 1, a2: 2, b1: 3, b2: 4, c1: 5 };
const jsonIndent = { a1: 4, a2: 4, b1: 2, b2: 2, c1: 4 };
const targetLetter = (process.argv[2] || "a").trim().toLowerCase();

const missingEntries = {
  a: ["Mạo từ", "Một", "I saw a bird in the tree.", "Tôi đã thấy một con chim trên cây."],
  about: ["Trạng từ/Giới từ", "Về/Khoảng", "We talked about school.", "Chúng tôi đã nói về trường học."],
  accused: ["Danh từ", "Bị cáo/Người bị buộc tội", "The accused waited for the judge.", "Bị cáo chờ thẩm phán."],
  adolescent: ["Danh từ", "Thanh thiếu niên", "The program supports adolescents at school.", "Chương trình hỗ trợ thanh thiếu niên ở trường."],
  ah: ["Thán từ", "À/Ồ", "Ah, now I understand.", "À, bây giờ tôi hiểu rồi."],
  aide: ["Danh từ", "Trợ lý/Phụ tá", "The aide prepared the report.", "Người trợ lý đã chuẩn bị báo cáo."],
  aids: ["Danh từ", "Bệnh AIDS", "AIDS is a serious disease.", "AIDS là một căn bệnh nghiêm trọng."],
  album: ["Danh từ", "Album/Tập ảnh", "Her new album came out today.", "Album mới của cô ấy ra mắt hôm nay."],
  alcohol: ["Danh từ", "Rượu/Đồ uống có cồn", "This drink contains no alcohol.", "Đồ uống này không chứa cồn."],
  alcoholic: ["Tính từ", "Có cồn/Liên quan đến rượu", "They do not sell alcoholic drinks here.", "Họ không bán đồ uống có cồn ở đây."],
  "all right": ["Tính từ/Trạng từ/Thán từ", "Ổn/Được rồi", "Everything is all right now.", "Mọi thứ bây giờ đều ổn."],
  allege: ["Động từ", "Cáo buộc/Cho là", "They allege that the rule was broken.", "Họ cáo buộc rằng quy định đã bị vi phạm."],
  allegedly: ["Trạng từ", "Được cho là/Bị cáo buộc là", "The money was allegedly taken last night.", "Số tiền được cho là đã bị lấy tối qua."],
  also: ["Trạng từ", "Cũng", "She also likes music.", "Cô ấy cũng thích âm nhạc."],
  aluminium: ["Danh từ", "Nhôm", "The frame is made of aluminium.", "Khung được làm bằng nhôm."],
  analyse: ["Động từ", "Phân tích", "We need to analyse the results.", "Chúng ta cần phân tích kết quả."],
  any: ["Từ hạn định/Đại từ", "Bất kỳ/Một chút nào", "Do you have any questions?", "Bạn có câu hỏi nào không?"],
  "any more": ["Trạng từ", "Nữa", "I do not live there any more.", "Tôi không sống ở đó nữa."],
  app: ["Danh từ", "Ứng dụng", "I downloaded a new app.", "Tôi đã tải một ứng dụng mới."],
  approve: ["Động từ", "Chấp thuận/Phê duyệt", "The manager will approve the plan.", "Quản lý sẽ phê duyệt kế hoạch."],
  april: ["Danh từ", "Tháng Tư", "My course starts in April.", "Khóa học của tôi bắt đầu vào tháng Tư."],
  at: ["Giới từ", "Ở/Tại", "Meet me at the station.", "Gặp tôi tại nhà ga."],
  athlete: ["Danh từ", "Vận động viên", "The athlete trains every morning.", "Vận động viên đó tập luyện mỗi sáng."],
  august: ["Danh từ", "Tháng Tám", "We will travel in August.", "Chúng tôi sẽ đi du lịch vào tháng Tám."],
  autumn: ["Danh từ", "Mùa thu", "The leaves fall in autumn.", "Lá rụng vào mùa thu."],
  away: ["Trạng từ", "Xa/Đi xa", "The shop is five minutes away.", "Cửa hàng cách đây năm phút."],
  backwards: ["Trạng từ", "Về phía sau/Ngược lại", "She took two steps backwards.", "Cô ấy lùi lại hai bước."],
  be: ["Động từ/Trợ động từ", "Thì/Là/Ở", "I want to be a teacher.", "Tôi muốn trở thành giáo viên."],
  beauty: ["Danh từ", "Vẻ đẹp", "Everyone admired the beauty of the garden.", "Mọi người đều ngưỡng mộ vẻ đẹp của khu vườn."],
  beer: ["Danh từ", "Bia", "He ordered a glass of beer.", "Anh ấy gọi một ly bia."],
  behaviour: ["Danh từ", "Hành vi/Cách cư xử", "Good behaviour is expected in class.", "Cần có cách cư xử tốt trong lớp."],
  billion: ["Số từ", "Tỷ", "The company is worth one billion dollars.", "Công ty trị giá một tỷ đô la."],
  blog: ["Danh từ", "Blog/Nhật ký trực tuyến", "She writes a travel blog.", "Cô ấy viết một blog du lịch."],
  bomb: ["Danh từ/Động từ", "Bom/Ném bom", "The bomb was found near the station.", "Quả bom được tìm thấy gần nhà ga."],
  boot: ["Danh từ", "Ủng/Giày bốt", "My boots are wet.", "Đôi bốt của tôi bị ướt."],
  breakdown: ["Danh từ", "Sự hỏng hóc/Sự suy sụp/Bản phân tích chi tiết", "The report gives a breakdown of the costs.", "Báo cáo đưa ra bản phân tích chi tiết các chi phí."],
  bullet: ["Danh từ", "Viên đạn", "The bullet hit the wall.", "Viên đạn trúng vào bức tường."],
  busy: ["Tính từ", "Bận rộn", "I am busy today.", "Hôm nay tôi bận."],
  by: ["Giới từ", "Bởi/Bằng/Ở cạnh", "The book was written by a doctor.", "Cuốn sách được viết bởi một bác sĩ."],
  bye: ["Thán từ", "Tạm biệt", "Bye, see you tomorrow.", "Tạm biệt, hẹn gặp bạn ngày mai."],
  cannot: ["Động từ khuyết thiếu", "Không thể", "I cannot open the door.", "Tôi không thể mở cửa."],
  carbon: ["Danh từ", "Các-bon", "Carbon is found in all living things.", "Các-bon có trong mọi sinh vật sống."],
  catalogue: ["Danh từ", "Danh mục/Tập giới thiệu sản phẩm", "The catalogue lists all the books.", "Danh mục liệt kê tất cả các cuốn sách."],
  cd: ["Danh từ", "Đĩa CD", "I bought a new CD.", "Tôi đã mua một đĩa CD mới."],
  centre: ["Danh từ", "Trung tâm", "The hotel is in the city centre.", "Khách sạn nằm ở trung tâm thành phố."],
  century: ["Danh từ", "Thế kỷ", "The castle was built in the fifteenth century.", "Lâu đài được xây vào thế kỷ mười lăm."],
  characterize: ["Động từ", "Đặc trưng hóa/Miêu tả đặc điểm", "High prices characterize the market.", "Giá cao là đặc trưng của thị trường."],
  cheat: ["Danh từ/Động từ", "Gian lận/Người gian lận", "Do not cheat in the exam.", "Đừng gian lận trong kỳ thi."],
  cigarette: ["Danh từ", "Điếu thuốc lá", "He gave up cigarettes last year.", "Anh ấy đã bỏ thuốc lá năm ngoái."],
  cinema: ["Danh từ", "Rạp chiếu phim/Điện ảnh", "We went to the cinema last night.", "Tối qua chúng tôi đã đi xem phim."],
  cocktail: ["Danh từ", "Cocktail/Đồ uống pha", "She ordered a fruit cocktail.", "Cô ấy gọi một ly cocktail trái cây."],
  colour: ["Danh từ", "Màu sắc", "What colour is your bag?", "Túi của bạn màu gì?"],
  coloured: ["Tính từ", "Có màu/Được tô màu", "The children used coloured pencils.", "Bọn trẻ dùng bút chì màu."],
  colourful: ["Tính từ", "Sặc sỡ/Nhiều màu sắc", "She wore a colourful dress.", "Cô ấy mặc một chiếc váy sặc sỡ."],
  constraint: ["Danh từ", "Sự ràng buộc/Hạn chế", "Time is the main constraint.", "Thời gian là hạn chế chính."],
  continually: ["Trạng từ", "Liên tục", "The system is continually improving.", "Hệ thống đang liên tục cải thiện."],
  cotton: ["Danh từ", "Bông/Vải cotton", "This shirt is made of cotton.", "Chiếc áo này được làm từ cotton."],
  could: ["Động từ khuyết thiếu", "Có thể/Đã có thể", "Could you help me?", "Bạn có thể giúp tôi không?"],
  councillor: ["Danh từ", "Ủy viên hội đồng", "The councillor met local residents.", "Ủy viên hội đồng đã gặp cư dân địa phương."],
  counselling: ["Danh từ", "Sự tư vấn", "The school offers counselling for students.", "Nhà trường cung cấp dịch vụ tư vấn cho học sinh."],
  counsellor: ["Danh từ", "Nhân viên tư vấn/Cố vấn", "She spoke to a counsellor.", "Cô ấy đã nói chuyện với một nhân viên tư vấn."],
  cue: ["Danh từ", "Tín hiệu/Gợi ý", "That was my cue to leave.", "Đó là tín hiệu để tôi rời đi."],
  cycle: ["Danh từ/Động từ", "Chu kỳ/Đạp xe", "I cycle to work every day.", "Tôi đạp xe đi làm mỗi ngày."],
  december: ["Danh từ", "Tháng Mười Hai", "December is the last month of the year.", "Tháng Mười Hai là tháng cuối cùng của năm."],
  defence: ["Danh từ", "Sự phòng thủ/Bào chữa", "The team played well in defence.", "Đội đã chơi phòng thủ tốt."],
  disk: ["Danh từ", "Đĩa", "Save the file to the disk.", "Hãy lưu tệp vào đĩa."],
  do: ["Động từ/Trợ động từ", "Làm", "What do you do?", "Bạn làm nghề gì?"],
  dollar: ["Danh từ", "Đô la", "The ticket costs ten dollars.", "Vé có giá mười đô la."],
  downwards: ["Trạng từ", "Xuống dưới", "The path goes downwards to the river.", "Con đường đi xuống phía dòng sông."],
  due: ["Tính từ", "Đến hạn/Dự kiến", "The report is due tomorrow.", "Báo cáo đến hạn vào ngày mai."],
  dvd: ["Danh từ", "Đĩa DVD", "We watched a film on DVD.", "Chúng tôi đã xem một bộ phim bằng DVD."],
  economics: ["Danh từ", "Kinh tế học", "She studied economics at university.", "Cô ấy học kinh tế học ở trường đại học."],
  editorial: ["Tính từ", "Thuộc biên tập/Thuộc xã luận", "The magazine has a clear editorial policy.", "Tạp chí có chính sách biên tập rõ ràng."],
  eight: ["Số từ", "Số tám", "There are eight students in the room.", "Có tám học sinh trong phòng."],
  eighteen: ["Số từ", "Số mười tám", "She is eighteen years old.", "Cô ấy mười tám tuổi."],
  eighty: ["Số từ", "Số tám mươi", "My grandfather is eighty.", "Ông tôi tám mươi tuổi."],
  electronics: ["Danh từ", "Thiết bị điện tử/Ngành điện tử", "The store sells electronics.", "Cửa hàng bán thiết bị điện tử."],
  eleven: ["Số từ", "Số mười một", "The train leaves at eleven.", "Tàu khởi hành lúc mười một giờ."],
  email: ["Danh từ/Động từ", "Email/Gửi email", "Please email me the document.", "Vui lòng gửi tài liệu cho tôi qua email."],
  endeavour: ["Danh từ", "Nỗ lực/Cố gắng", "The project was a major scientific endeavour.", "Dự án là một nỗ lực khoa học lớn."],
  enquire: ["Động từ", "Hỏi/Điều tra", "I called to enquire about the course.", "Tôi đã gọi để hỏi về khóa học."],
  enquiry: ["Danh từ", "Câu hỏi/Sự điều tra", "We received an enquiry from a customer.", "Chúng tôi nhận được một câu hỏi từ khách hàng."],
  enrol: ["Động từ", "Ghi danh/Đăng ký học", "Students can enrol online.", "Sinh viên có thể ghi danh trực tuyến."],
  ethic: ["Danh từ", "Đạo đức/Nguyên tắc đạo đức", "The company promotes a strong work ethic.", "Công ty khuyến khích tinh thần làm việc nghiêm túc."],
  euro: ["Danh từ", "Đồng euro", "The ticket costs twenty euros.", "Vé có giá hai mươi euro."],
  favour: ["Danh từ", "Sự giúp đỡ/Thiện ý", "Could you do me a favour?", "Bạn có thể giúp tôi một việc không?"],
  favourable: ["Tính từ", "Thuận lợi/Có thiện cảm", "The proposal received a favourable response.", "Đề xuất nhận được phản hồi thuận lợi."],
  favourite: ["Tính từ/Danh từ", "Yêu thích/Người hoặc vật được yêu thích", "Blue is my favourite colour.", "Màu xanh là màu yêu thích của tôi."],
  february: ["Danh từ", "Tháng Hai", "My birthday is in February.", "Sinh nhật của tôi vào tháng Hai."],
  few: ["Tính từ/Từ hạn định/Đại từ", "Một vài/Ít", "I have a few questions.", "Tôi có một vài câu hỏi."],
  fibre: ["Danh từ", "Chất xơ/Sợi", "Fruit is a good source of fibre.", "Trái cây là nguồn chất xơ tốt."],
  fifteen: ["Số từ", "Số mười lăm", "There are fifteen people in the room.", "Có mười lăm người trong phòng."],
  fifth: ["Số thứ tự", "Thứ năm", "This is my fifth visit.", "Đây là lần thăm thứ năm của tôi."],
  fifty: ["Số từ", "Số năm mươi", "The book costs fifty dollars.", "Cuốn sách có giá năm mươi đô la."],
  "film-maker": ["Danh từ", "Nhà làm phim", "The film-maker won an award.", "Nhà làm phim đã giành được một giải thưởng."],
  five: ["Số từ", "Số năm", "I have five books.", "Tôi có năm cuốn sách."],
  flavour: ["Danh từ", "Hương vị", "This soup has a strong flavour.", "Món súp này có hương vị đậm."],
  for: ["Giới từ", "Cho/Vì/Trong khoảng", "This gift is for you.", "Món quà này dành cho bạn."],
  forty: ["Số từ", "Số bốn mươi", "She is forty years old.", "Cô ấy bốn mươi tuổi."],
  four: ["Số từ", "Số bốn", "We need four chairs.", "Chúng ta cần bốn cái ghế."],
  fourteen: ["Số từ", "Số mười bốn", "He is fourteen years old.", "Cậu ấy mười bốn tuổi."],
  fourth: ["Số thứ tự", "Thứ tư", "She finished in fourth place.", "Cô ấy về đích ở vị trí thứ tư."],
  friday: ["Danh từ", "Thứ Sáu", "The meeting is on Friday.", "Cuộc họp diễn ra vào thứ Sáu."],
  fulfil: ["Động từ", "Hoàn thành/Thực hiện", "She worked hard to fulfil her dream.", "Cô ấy làm việc chăm chỉ để thực hiện ước mơ của mình."],
  gaming: ["Danh từ", "Việc chơi trò chơi điện tử/Ngành game", "Gaming is popular among teenagers.", "Chơi game phổ biến trong thanh thiếu niên."],
  gay: ["Tính từ", "Đồng tính nam/Thuộc người đồng tính", "He is an active member of the gay community.", "Anh ấy là một thành viên tích cực của cộng đồng người đồng tính."],
  gentleman: ["Danh từ", "Quý ông/Người đàn ông lịch sự", "He behaved like a gentleman.", "Anh ấy cư xử như một quý ông."],
  goodbye: ["Thán từ/Danh từ", "Tạm biệt/Lời tạm biệt", "She waved goodbye at the door.", "Cô ấy vẫy tay tạm biệt ở cửa."],
  grey: ["Tính từ/Danh từ", "Màu xám", "The sky is grey today.", "Bầu trời hôm nay màu xám."],
  gun: ["Danh từ", "Súng", "The police found a gun.", "Cảnh sát tìm thấy một khẩu súng."],
  harbour: ["Danh từ", "Bến cảng/Cảng", "The boats returned to the harbour.", "Những chiếc thuyền quay về bến cảng."],
  have: ["Động từ", "Có/Ăn/Uống", "I have two brothers.", "Tôi có hai anh em trai."],
  "have to": ["Động từ khuyết thiếu", "Phải", "I have to leave now.", "Tôi phải rời đi bây giờ."],
  he: ["Đại từ", "Anh ấy/Ông ấy", "He is my friend.", "Anh ấy là bạn của tôi."],
  hello: ["Thán từ/Danh từ", "Xin chào/Lời chào", "Hello, how are you?", "Xin chào, bạn khỏe không?"],
  her: ["Từ hạn định/Đại từ", "Của cô ấy/Cô ấy", "This is her book.", "Đây là sách của cô ấy."],
  hers: ["Đại từ", "Của cô ấy", "The blue bag is hers.", "Chiếc túi màu xanh là của cô ấy."],
  herself: ["Đại từ", "Chính cô ấy/Tự cô ấy", "She made the cake herself.", "Cô ấy tự làm chiếc bánh."],
  hey: ["Thán từ", "Này/Ê", "Hey, wait for me!", "Này, đợi tôi với!"],
  hi: ["Thán từ", "Chào", "Hi, nice to meet you.", "Chào, rất vui được gặp bạn."],
  him: ["Đại từ", "Anh ấy/Ông ấy", "I called him yesterday.", "Tôi đã gọi cho anh ấy hôm qua."],
  himself: ["Đại từ", "Chính anh ấy/Tự anh ấy", "He fixed the bike himself.", "Anh ấy tự sửa chiếc xe đạp."],
  his: ["Từ hạn định", "Của anh ấy/Của ông ấy", "His car is outside.", "Xe của anh ấy ở bên ngoài."],
  holiday: ["Danh từ", "Kỳ nghỉ/Ngày lễ", "We went to the beach on holiday.", "Chúng tôi đi biển trong kỳ nghỉ."],
  honour: ["Danh từ/Động từ", "Danh dự/Vinh danh", "It is an honour to meet you.", "Thật vinh dự khi được gặp bạn."],
  how: ["Trạng từ", "Như thế nào/Bằng cách nào", "How do you spell your name?", "Bạn đánh vần tên mình như thế nào?"],
  humour: ["Danh từ", "Sự hài hước", "I like her sense of humour.", "Tôi thích khiếu hài hước của cô ấy."],
  hundred: ["Số từ", "Một trăm", "There are one hundred pages.", "Có một trăm trang."],
  hydrogen: ["Danh từ", "Hiđrô", "Hydrogen is a chemical element.", "Hiđrô là một nguyên tố hóa học."],
  i: ["Đại từ", "Tôi", "I am a student.", "Tôi là học sinh."],
  id: ["Danh từ", "Giấy tờ tùy thân/Mã định danh", "You need to show your ID.", "Bạn cần xuất trình giấy tờ tùy thân."],
  in: ["Trạng từ/Giới từ", "Trong/Ở trong", "She is in the kitchen.", "Cô ấy đang ở trong bếp."],
  inch: ["Danh từ", "Inch/Đơn vị đo chiều dài", "The screen is ten inches wide.", "Màn hình rộng mười inch."],
  installation: ["Danh từ", "Sự lắp đặt/Bản cài đặt", "The installation took two hours.", "Việc lắp đặt mất hai giờ."],
  internet: ["Danh từ", "Internet", "I found the answer on the internet.", "Tôi tìm thấy câu trả lời trên internet."],
  into: ["Giới từ", "Vào trong/Thành", "She walked into the room.", "Cô ấy bước vào phòng."],
  it: ["Đại từ", "Nó/Điều đó", "It is raining.", "Trời đang mưa."],
  its: ["Từ hạn định", "Của nó", "The dog wagged its tail.", "Con chó vẫy đuôi của nó."],
  itself: ["Đại từ", "Chính nó/Tự nó", "The machine turns itself off.", "Máy tự tắt."],
  january: ["Danh từ", "Tháng Một", "January is the first month of the year.", "Tháng Một là tháng đầu tiên của năm."],
  jazz: ["Danh từ", "Nhạc jazz", "I like listening to jazz.", "Tôi thích nghe nhạc jazz."],
  jeans: ["Danh từ", "Quần bò/Quần jean", "She wore blue jeans.", "Cô ấy mặc quần jean xanh."],
  jewellery: ["Danh từ", "Trang sức", "She keeps her jewellery in a small box.", "Cô ấy cất trang sức trong một chiếc hộp nhỏ."],
  journey: ["Danh từ", "Chuyến đi/Hành trình", "The journey took three hours.", "Chuyến đi mất ba giờ."],
  judgement: ["Danh từ", "Sự phán đoán/Phán quyết", "You should trust your own judgement.", "Bạn nên tin vào phán đoán của chính mình."],
  july: ["Danh từ", "Tháng Bảy", "We are going on holiday in July.", "Chúng tôi sẽ đi nghỉ vào tháng Bảy."],
  june: ["Danh từ", "Tháng Sáu", "The course starts in June.", "Khóa học bắt đầu vào tháng Sáu."],
  killing: ["Danh từ", "Việc giết người/Sự sát hại", "The killing shocked the whole town.", "Vụ sát hại khiến cả thị trấn bàng hoàng."],
  kilometre: ["Danh từ", "Ki-lô-mét", "The school is one kilometre away.", "Trường học cách đây một ki-lô-mét."],
  labour: ["Danh từ", "Lao động/Công việc nặng nhọc", "The project required a lot of labour.", "Dự án đòi hỏi rất nhiều lao động."],
  laptop: ["Danh từ", "Máy tính xách tay", "She works on her laptop.", "Cô ấy làm việc trên máy tính xách tay."],
  laser: ["Danh từ", "Tia laser", "The doctor used a laser during the operation.", "Bác sĩ đã dùng tia laser trong ca phẫu thuật."],
  leaf: ["Danh từ", "Lá cây", "A leaf fell from the tree.", "Một chiếc lá rơi từ trên cây xuống."],
  lesbian: ["Tính từ", "Đồng tính nữ/Thuộc người đồng tính nữ", "The film tells a lesbian love story.", "Bộ phim kể một câu chuyện tình yêu đồng tính nữ."],
  let: ["Động từ", "Để/Cho phép", "Let me help you.", "Hãy để tôi giúp bạn."],
  licence: ["Danh từ", "Giấy phép/Bằng", "You need a driving licence.", "Bạn cần bằng lái xe."],
  lighting: ["Danh từ", "Ánh sáng/Hệ thống chiếu sáng", "The lighting in this room is poor.", "Ánh sáng trong phòng này kém."],
  litre: ["Danh từ", "Lít", "The bottle holds one litre of water.", "Cái chai chứa một lít nước."],
  little: ["Tính từ/Từ hạn định/Đại từ", "Nhỏ/Ít", "There is little time left.", "Còn lại rất ít thời gian."],
  logo: ["Danh từ", "Biểu trưng/Logo", "The company changed its logo.", "Công ty đã thay đổi logo."],
  "long-term": ["Tính từ/Trạng từ", "Dài hạn", "We need a long-term plan.", "Chúng ta cần một kế hoạch dài hạn."],
  lose: ["Động từ", "Mất/Thua", "Do not lose your ticket.", "Đừng làm mất vé của bạn."],
  "make-up": ["Danh từ", "Đồ trang điểm/Cách cấu thành", "She put on make-up before the party.", "Cô ấy trang điểm trước bữa tiệc."],
  many: ["Từ hạn định/Đại từ", "Nhiều", "Many people came to the event.", "Nhiều người đã đến sự kiện."],
  marathon: ["Danh từ", "Cuộc chạy marathon", "He ran a marathon last year.", "Anh ấy đã chạy marathon năm ngoái."],
  martial: ["Tính từ", "Thuộc quân sự/Võ thuật", "She studies martial arts.", "Cô ấy học võ thuật."],
  maths: ["Danh từ", "Môn toán", "Maths is my favourite subject.", "Toán là môn học yêu thích của tôi."],
  may: ["Danh từ", "Tháng Năm", "The festival is in May.", "Lễ hội diễn ra vào tháng Năm."],
  maybe: ["Trạng từ", "Có lẽ", "Maybe we can go tomorrow.", "Có lẽ chúng ta có thể đi vào ngày mai."],
  me: ["Đại từ", "Tôi/Tớ/Mình", "Can you help me?", "Bạn có thể giúp tôi không?"],
  metre: ["Danh từ", "Mét", "The table is one metre long.", "Cái bàn dài một mét."],
  might: ["Động từ khuyết thiếu", "Có thể/Có lẽ", "It might rain later.", "Có thể lát nữa trời sẽ mưa."],
  mile: ["Danh từ", "Dặm", "The village is two miles away.", "Ngôi làng cách đây hai dặm."],
  million: ["Số từ", "Triệu", "The city has one million people.", "Thành phố có một triệu người."],
  monday: ["Danh từ", "Thứ Hai", "I start work on Monday.", "Tôi bắt đầu làm việc vào thứ Hai."],
  more: ["Trạng từ/Từ hạn định/Đại từ", "Hơn/Nhiều hơn", "I need more time.", "Tôi cần thêm thời gian."],
  much: ["Trạng từ/Từ hạn định/Đại từ", "Nhiều", "There is not much water left.", "Không còn nhiều nước."],
  mum: ["Danh từ", "Mẹ", "My mum is a teacher.", "Mẹ tôi là giáo viên."],
  murder: ["Danh từ/Động từ", "Vụ giết người/Giết người", "The police investigated the murder.", "Cảnh sát đã điều tra vụ giết người."],
  must: ["Động từ khuyết thiếu", "Phải", "You must wear a seat belt.", "Bạn phải thắt dây an toàn."],
  my: ["Từ hạn định", "Của tôi", "This is my phone.", "Đây là điện thoại của tôi."],
  myself: ["Đại từ", "Chính tôi/Tự tôi", "I made it myself.", "Tôi tự làm nó."],
  naked: ["Tính từ", "Khỏa thân/Trần trụi", "The child was naked after the bath.", "Đứa trẻ trần truồng sau khi tắm."],
  neighbour: ["Danh từ", "Hàng xóm", "Our neighbour is very friendly.", "Hàng xóm của chúng tôi rất thân thiện."],
  neighbourhood: ["Danh từ", "Khu phố/Vùng lân cận", "This is a quiet neighbourhood.", "Đây là một khu phố yên tĩnh."],
  neighbouring: ["Tính từ", "Lân cận", "People came from neighbouring villages.", "Mọi người đến từ các làng lân cận."],
  nine: ["Số từ", "Số chín", "There are nine chairs in the room.", "Có chín cái ghế trong phòng."],
  nineteen: ["Số từ", "Số mười chín", "She is nineteen years old.", "Cô ấy mười chín tuổi."],
  ninety: ["Số từ", "Số chín mươi", "My grandmother is ninety.", "Bà tôi chín mươi tuổi."],
  no: ["Từ hạn định/Thán từ", "Không/Không có", "No students were late today.", "Hôm nay không có học sinh nào đến muộn."],
  "no one": ["Đại từ", "Không ai", "No one answered the phone.", "Không ai trả lời điện thoại."],
  nor: ["Trạng từ/Liên từ", "Cũng không", "She does not smoke, nor does she drink.", "Cô ấy không hút thuốc, cũng không uống rượu."],
  not: ["Trạng từ", "Không", "I am not ready.", "Tôi chưa sẵn sàng."],
  notable: ["Tính từ", "Đáng chú ý/Nổi bật", "There was a notable increase in sales.", "Doanh số đã tăng đáng chú ý."],
  november: ["Danh từ", "Tháng Mười Một", "The exam is in November.", "Kỳ thi diễn ra vào tháng Mười Một."],
  oblige: ["Động từ", "Bắt buộc/Giúp đỡ", "The law obliges companies to keep records.", "Luật bắt buộc các công ty phải lưu hồ sơ."],
  october: ["Danh từ", "Tháng Mười", "The event is in October.", "Sự kiện diễn ra vào tháng Mười."],
  of: ["Giới từ", "Của/Về", "This is a picture of my family.", "Đây là một bức ảnh của gia đình tôi."],
  off: ["Trạng từ/Giới từ", "Tắt/Rời khỏi", "Please turn off the light.", "Vui lòng tắt đèn."],
  offence: ["Danh từ", "Tội phạm/Sự xúc phạm", "Driving too fast is a serious offence.", "Lái xe quá nhanh là một lỗi vi phạm nghiêm trọng."],
  oh: ["Thán từ", "Ồ/Ôi", "Oh, I forgot my keys.", "Ồ, tôi quên chìa khóa rồi."],
  ok: ["Tính từ/Trạng từ/Thán từ", "Ổn/Được", "Is it OK if I sit here?", "Tôi ngồi đây có được không?"],
  on: ["Trạng từ/Giới từ", "Trên/Bật/Đang", "The book is on the table.", "Cuốn sách ở trên bàn."],
  one: ["Từ hạn định/Số từ/Đại từ", "Một", "I have one brother.", "Tôi có một anh/em trai."],
  onto: ["Giới từ", "Lên trên/Vào", "The cat jumped onto the wall.", "Con mèo nhảy lên bức tường."],
  opera: ["Danh từ", "Nhạc kịch/Opera", "We went to the opera last night.", "Tối qua chúng tôi đi xem opera."],
  ought: ["Động từ khuyết thiếu", "Nên/Phải", "You ought to apologize.", "Bạn nên xin lỗi."],
  our: ["Từ hạn định", "Của chúng tôi/Của chúng ta", "This is our house.", "Đây là nhà của chúng tôi."],
  ours: ["Đại từ", "Của chúng tôi/Của chúng ta", "That car is ours.", "Chiếc xe đó là của chúng tôi."],
  ourselves: ["Đại từ", "Chính chúng tôi/Tự chúng tôi", "We cooked dinner ourselves.", "Chúng tôi tự nấu bữa tối."],
  out: ["Trạng từ/Giới từ", "Ra ngoài/Ngoài", "She went out after lunch.", "Cô ấy ra ngoài sau bữa trưa."],
  over: ["Trạng từ/Giới từ", "Qua/Trên/Kết thúc", "The plane flew over the city.", "Máy bay bay qua thành phố."],
  "per cent": ["Tính từ/Trạng từ/Danh từ", "Phần trăm", "Prices rose by five per cent.", "Giá đã tăng năm phần trăm."],
  piano: ["Danh từ", "Đàn piano", "She can play the piano.", "Cô ấy biết chơi đàn piano."],
  policeman: ["Danh từ", "Cảnh sát nam", "The policeman helped the child cross the road.", "Viên cảnh sát giúp đứa trẻ qua đường."],
  pond: ["Danh từ", "Ao/Hồ nhỏ", "There are fish in the pond.", "Có cá trong ao."],
  pop: ["Tính từ/Danh từ", "Nhạc pop/Thuộc nhạc pop", "She likes pop music.", "Cô ấy thích nhạc pop."],
  pound: ["Danh từ", "Bảng Anh/Đơn vị pao", "The book costs ten pounds.", "Cuốn sách có giá mười bảng."],
  practise: ["Động từ", "Luyện tập/Thực hành", "You should practise every day.", "Bạn nên luyện tập mỗi ngày."],
  precede: ["Động từ", "Đi trước/Xảy ra trước", "A short speech will precede the meal.", "Một bài phát biểu ngắn sẽ diễn ra trước bữa ăn."],
  predominantly: ["Trạng từ", "Chủ yếu/Phần lớn", "The area is predominantly rural.", "Khu vực này chủ yếu là nông thôn."],
  proceeding: ["Danh từ", "Thủ tục tố tụng/Quá trình", "The legal proceeding lasted months.", "Thủ tục pháp lý kéo dài nhiều tháng."],
  programme: ["Danh từ", "Chương trình", "The training programme lasts six weeks.", "Chương trình đào tạo kéo dài sáu tuần."],
  punk: ["Danh từ", "Nhạc punk/Người theo phong cách punk", "He played in a punk band.", "Anh ấy chơi trong một ban nhạc punk."],
  radar: ["Danh từ", "Ra-đa", "The plane was detected by radar.", "Máy bay được phát hiện bằng ra-đa."],
  radio: ["Danh từ", "Đài/Radio", "I listen to the radio every morning.", "Tôi nghe radio mỗi sáng."],
  rape: ["Danh từ/Động từ", "Hiếp dâm/Tội hiếp dâm", "The law treats rape as a serious crime.", "Luật coi hiếp dâm là một tội nghiêm trọng."],
  rifle: ["Danh từ", "Súng trường", "The soldier carried a rifle.", "Người lính mang một khẩu súng trường."],
  robot: ["Danh từ", "Người máy/Rô-bốt", "The robot can clean the floor.", "Rô-bốt có thể lau sàn."],
  rumour: ["Danh từ", "Tin đồn", "There is a rumour about the new manager.", "Có một tin đồn về quản lý mới."],
  salad: ["Danh từ", "Món xa lát/Rau trộn", "I had a salad for lunch.", "Tôi ăn xa lát vào bữa trưa."],
  sandwich: ["Danh từ", "Bánh mì kẹp", "She made a cheese sandwich.", "Cô ấy làm một chiếc bánh mì kẹp phô mai."],
  saturday: ["Danh từ", "Thứ Bảy", "We play football on Saturday.", "Chúng tôi chơi bóng đá vào thứ Bảy."],
  scattered: ["Tính từ", "Rải rác/Phân tán", "There were scattered houses along the road.", "Có những ngôi nhà rải rác dọc con đường."],
  sceptical: ["Tính từ", "Hoài nghi", "Many experts are sceptical about the claim.", "Nhiều chuyên gia hoài nghi về tuyên bố đó."],
  sea: ["Danh từ", "Biển", "The hotel is near the sea.", "Khách sạn ở gần biển."],
  september: ["Danh từ", "Tháng Chín", "School starts in September.", "Trường học bắt đầu vào tháng Chín."],
  set: ["Danh từ/Động từ", "Bộ/Đặt/Thiết lập", "Please set the table for dinner.", "Vui lòng dọn bàn cho bữa tối."],
  "set-up": ["Danh từ", "Cách sắp xếp/Hệ thống", "The new set-up works well.", "Cách sắp xếp mới hoạt động tốt."],
  seven: ["Số từ", "Số bảy", "There are seven days in a week.", "Có bảy ngày trong một tuần."],
  seventeen: ["Số từ", "Số mười bảy", "He is seventeen years old.", "Cậu ấy mười bảy tuổi."],
  seventy: ["Số từ", "Số bảy mươi", "My grandfather is seventy.", "Ông tôi bảy mươi tuổi."],
  sex: ["Danh từ", "Giới tính/Tình dục", "The form asks for your age and sex.", "Biểu mẫu hỏi tuổi và giới tính của bạn."],
  sexual: ["Tính từ", "Thuộc tình dục/Giới tính", "The report discusses sexual health.", "Báo cáo thảo luận về sức khỏe tình dục."],
  sexuality: ["Danh từ", "Tính dục/Xu hướng tính dục", "The course explores gender and sexuality.", "Khóa học tìm hiểu về giới và tính dục."],
  sexy: ["Tính từ", "Gợi cảm/Quyến rũ", "The advertisement used a sexy image.", "Quảng cáo đã dùng một hình ảnh gợi cảm."],
  shall: ["Động từ khuyết thiếu", "Sẽ/Nên", "Shall we begin?", "Chúng ta bắt đầu nhé?"],
  she: ["Đại từ", "Cô ấy/Bà ấy", "She is my sister.", "Cô ấy là chị gái của tôi."],
  shooting: ["Danh từ", "Vụ nổ súng/Việc bắn", "The shooting shocked the city.", "Vụ nổ súng khiến thành phố bàng hoàng."],
  "short-term": ["Tính từ", "Ngắn hạn", "We need a short-term solution.", "Chúng ta cần một giải pháp ngắn hạn."],
  should: ["Động từ khuyết thiếu", "Nên", "You should rest.", "Bạn nên nghỉ ngơi."],
  six: ["Số từ", "Số sáu", "The class starts at six.", "Lớp học bắt đầu lúc sáu giờ."],
  sixteen: ["Số từ", "Số mười sáu", "She is sixteen.", "Cô ấy mười sáu tuổi."],
  sixty: ["Số từ", "Số sáu mươi", "There are sixty minutes in an hour.", "Có sáu mươi phút trong một giờ."],
  smartphone: ["Danh từ", "Điện thoại thông minh", "I bought a new smartphone.", "Tôi đã mua một chiếc điện thoại thông minh mới."],
  so: ["Trạng từ/Liên từ", "Rất/Vì vậy", "I was tired, so I went home.", "Tôi mệt, vì vậy tôi về nhà."],
  some: ["Từ hạn định/Đại từ", "Một vài/Một ít", "Would you like some tea?", "Bạn có muốn một ít trà không?"],
  sorry: ["Tính từ/Thán từ", "Xin lỗi/Tiếc", "Sorry, I am late.", "Xin lỗi, tôi đến muộn."],
  spokesperson: ["Danh từ", "Người phát ngôn", "A spokesperson answered the questions.", "Một người phát ngôn đã trả lời các câu hỏi."],
  spokeswoman: ["Danh từ", "Nữ phát ngôn viên", "The spokeswoman gave a short statement.", "Nữ phát ngôn viên đưa ra một tuyên bố ngắn."],
  stick: ["Danh từ/Động từ", "Cây gậy/Dán/Dính", "The label will stick to the bottle.", "Nhãn sẽ dính vào chai."],
  sunday: ["Danh từ", "Chủ Nhật", "We visit our grandparents on Sunday.", "Chúng tôi thăm ông bà vào Chủ Nhật."],
  tactic: ["Danh từ", "Chiến thuật", "The coach changed his tactic during the match.", "Huấn luyện viên đã thay đổi chiến thuật trong trận đấu."],
  tale: ["Danh từ", "Câu chuyện", "Grandma told us an old tale.", "Bà kể cho chúng tôi một câu chuyện cổ."],
  taxi: ["Danh từ", "Taxi/Xe taxi", "We took a taxi to the airport.", "Chúng tôi đi taxi đến sân bay."],
  ten: ["Số từ", "Số mười", "There are ten students in the room.", "Có mười học sinh trong phòng."],
  tennis: ["Danh từ", "Quần vợt/Tennis", "She plays tennis on weekends.", "Cô ấy chơi tennis vào cuối tuần."],
  than: ["Liên từ/Giới từ", "Hơn/So với", "She is taller than me.", "Cô ấy cao hơn tôi."],
  thank: ["Động từ", "Cảm ơn", "I want to thank you for your help.", "Tôi muốn cảm ơn bạn vì sự giúp đỡ."],
  thanks: ["Thán từ/Danh từ", "Cảm ơn/Lời cảm ơn", "Thanks for coming.", "Cảm ơn vì đã đến."],
  the: ["Mạo từ xác định", "Cái/Người/Sự đã xác định", "The sun is bright today.", "Mặt trời hôm nay rất sáng."],
  theatre: ["Danh từ", "Nhà hát/Rạp hát", "We went to the theatre last night.", "Tối qua chúng tôi đã đi nhà hát."],
  their: ["Từ hạn định", "Của họ", "Their house is near the park.", "Nhà của họ ở gần công viên."],
  theirs: ["Đại từ", "Của họ", "This book is theirs.", "Cuốn sách này là của họ."],
  them: ["Đại từ", "Họ/Chúng", "I saw them yesterday.", "Tôi đã gặp họ hôm qua."],
  themselves: ["Đại từ", "Chính họ/Tự họ", "They cooked dinner themselves.", "Họ tự nấu bữa tối."],
  they: ["Đại từ", "Họ/Chúng", "They are my friends.", "Họ là bạn của tôi."],
  thirteen: ["Số từ", "Số mười ba", "He is thirteen years old.", "Cậu ấy mười ba tuổi."],
  thirty: ["Số từ", "Số ba mươi", "The lesson lasts thirty minutes.", "Bài học kéo dài ba mươi phút."],
  thousand: ["Số từ", "Nghìn", "The town has five thousand people.", "Thị trấn có năm nghìn người."],
  three: ["Số từ", "Số ba", "I have three books.", "Tôi có ba cuốn sách."],
  through: ["Trạng từ/Giới từ", "Qua/Xuyên qua", "We walked through the forest.", "Chúng tôi đi xuyên qua khu rừng."],
  thursday: ["Danh từ", "Thứ Năm", "The meeting is on Thursday.", "Cuộc họp diễn ra vào thứ Năm."],
  to: ["Dấu hiệu nguyên mẫu/Giới từ", "Đến/Để", "I want to learn English.", "Tôi muốn học tiếng Anh."],
  tonne: ["Danh từ", "Tấn", "The truck carried one tonne of rice.", "Xe tải chở một tấn gạo."],
  too: ["Trạng từ", "Cũng/Quá", "I want to go too.", "Tôi cũng muốn đi."],
  towards: ["Giới từ", "Về phía/Hướng tới", "She walked towards the door.", "Cô ấy đi về phía cánh cửa."],
  transmission: ["Danh từ", "Sự truyền/Truyền tải", "The transmission of data was slow.", "Việc truyền dữ liệu diễn ra chậm."],
  traveller: ["Danh từ", "Du khách/Người đi lại", "The traveller carried a small bag.", "Du khách mang một chiếc túi nhỏ."],
  trousers: ["Danh từ", "Quần dài", "He bought a new pair of trousers.", "Anh ấy mua một chiếc quần dài mới."],
  tuesday: ["Danh từ", "Thứ Ba", "The shop is closed on Tuesday.", "Cửa hàng đóng cửa vào thứ Ba."],
  tuition: ["Danh từ", "Học phí/Sự dạy kèm", "Tuition fees are increasing.", "Học phí đang tăng."],
  tv: ["Danh từ", "Ti vi/Truyền hình", "I watched TV after dinner.", "Tôi xem ti vi sau bữa tối."],
  twelve: ["Số từ", "Số mười hai", "There are twelve months in a year.", "Có mười hai tháng trong một năm."],
  twenty: ["Số từ", "Số hai mươi", "She bought twenty tickets.", "Cô ấy mua hai mươi vé."],
  two: ["Số từ", "Số hai", "I have two sisters.", "Tôi có hai chị/em gái."],
  tyre: ["Danh từ", "Lốp xe", "The car has a flat tyre.", "Chiếc xe bị xẹp lốp."],
  up: ["Trạng từ/Giới từ", "Lên/Ở phía trên", "She walked up the stairs.", "Cô ấy đi lên cầu thang."],
  upon: ["Giới từ", "Trên/Khi", "The decision depends upon the results.", "Quyết định phụ thuộc vào kết quả."],
  upwards: ["Trạng từ", "Lên trên/Hướng lên", "The smoke rose upwards.", "Khói bay lên trên."],
  us: ["Đại từ", "Chúng tôi/Chúng ta", "Can you help us?", "Bạn có thể giúp chúng tôi không?"],
  van: ["Danh từ", "Xe tải nhỏ/Xe van", "The company uses a van to deliver goods.", "Công ty dùng xe van để giao hàng."],
  video: ["Danh từ", "Video/Đoạn phim", "I watched a short video online.", "Tôi đã xem một video ngắn trên mạng."],
  village: ["Danh từ", "Ngôi làng", "She grew up in a small village.", "Cô ấy lớn lên trong một ngôi làng nhỏ."],
  violent: ["Tính từ", "Bạo lực/Dữ dội", "The storm became more violent at night.", "Cơn bão trở nên dữ dội hơn vào ban đêm."],
  virus: ["Danh từ", "Vi-rút", "The virus spread quickly.", "Vi-rút lây lan nhanh chóng."],
  visa: ["Danh từ", "Thị thực/Visa", "You need a visa to enter the country.", "Bạn cần thị thực để vào quốc gia đó."],
  vitamin: ["Danh từ", "Vitamin", "Oranges contain vitamin C.", "Cam chứa vitamin C."],
  we: ["Đại từ", "Chúng tôi/Chúng ta", "We are learning English together.", "Chúng ta đang học tiếng Anh cùng nhau."],
  weapon: ["Danh từ", "Vũ khí", "The police found a weapon in the car.", "Cảnh sát tìm thấy một vũ khí trong xe."],
  web: ["Danh từ", "Mạng web", "I found the information on the web.", "Tôi tìm thấy thông tin đó trên web."],
  website: ["Danh từ", "Trang web", "The school has a new website.", "Trường có một trang web mới."],
  wednesday: ["Danh từ", "Thứ Tư", "The class is on Wednesday.", "Lớp học diễn ra vào thứ Tư."],
  weigh: ["Động từ", "Nặng/Cân", "This bag weighs ten kilos.", "Cái túi này nặng mười ki-lô."],
  whatsoever: ["Trạng từ", "Bất kỳ/Chút nào", "There is no evidence whatsoever.", "Không có bất kỳ bằng chứng nào."],
  wine: ["Danh từ", "Rượu vang", "They served red wine with dinner.", "Họ phục vụ rượu vang đỏ trong bữa tối."],
  would: ["Động từ khuyết thiếu", "Sẽ/Muốn", "Would you like some tea?", "Bạn có muốn uống trà không?"],
  wow: ["Thán từ", "Chà/Ôi", "Wow, that view is beautiful!", "Chà, khung cảnh đó đẹp quá!"],
  yeah: ["Thán từ", "Ừ/Vâng", "Yeah, I agree with you.", "Ừ, tôi đồng ý với bạn."],
  yes: ["Thán từ", "Vâng/Có", "Yes, I can help you.", "Vâng, tôi có thể giúp bạn."],
  you: ["Đại từ", "Bạn/Các bạn", "You are my friend.", "Bạn là bạn của tôi."],
  your: ["Từ hạn định", "Của bạn/Của các bạn", "Is this your book?", "Đây có phải sách của bạn không?"],
  yours: ["Đại từ", "Của bạn/Của các bạn", "This seat is yours.", "Chỗ ngồi này là của bạn."],
  yourself: ["Đại từ", "Chính bạn/Tự bạn", "You should believe in yourself.", "Bạn nên tin vào chính mình."],
};

function getWord(item) {
  return String(item["từ"] || "").trim();
}

function keyOf(value) {
  return String(value || "").trim().toLowerCase();
}

function parseOxfordEntries() {
  const html = fs.readFileSync("/tmp/oxford3000-5000.html", "utf8");
  const result = new Map();

  for (const part of html.split(/<li\s+/).slice(1)) {
    const hw = part.match(/data-hw="([^"]+)"/);
    if (!hw) continue;

    const word = hw[1].replace(/&amp;/g, "&");
    const key = keyOf(word);
    if (!key.startsWith(targetLetter)) continue;

    const levelMatch = part.match(/<span class="belong-to">([^<]+)<\/span>/);
    if (!levelMatch) continue;

    const posMatch = part.match(/<span class="pos">([^<]+)<\/span>/);
    const entry = {
      word,
      key,
      level: levelMatch[1].trim(),
      pos: posMatch ? posMatch[1].trim() : "",
    };

    const previous = result.get(key);
    if (!previous || levelRank[entry.level] < levelRank[previous.level]) {
      result.set(key, entry);
    } else if (
      previous &&
      levelRank[entry.level] === levelRank[previous.level] &&
      entry.pos &&
      !previous.pos.split("/").includes(entry.pos)
    ) {
      previous.pos += `/${entry.pos}`;
    }
  }

  return [...result.values()].sort((a, b) => a.word.localeCompare(b.word));
}

function createEntry(word) {
  const entry = missingEntries[keyOf(word)];
  if (!entry) {
    throw new Error(`Missing Vietnamese entry for "${word}"`);
  }
  const [partOfSpeech, meaning, example, exampleMeaning] = entry;
  return {
    "từ": word,
    "loại từ": partOfSpeech,
    "nghĩa": meaning,
    "ví dụ": example,
    "nghĩa ví dụ": exampleMeaning,
  };
}

const oxfordEntries = parseOxfordEntries();
const oxfordByKey = new Map(oxfordEntries.map((entry) => [entry.key, entry]));
const dataByLevel = Object.fromEntries(
  levels.map((level) => [
    level,
    JSON.parse(fs.readFileSync(`data/${level}_vocab_partial_template.json`, "utf8")),
  ]),
);

const existingByKey = new Map();
const existingExtraLevel = new Map();

for (const level of levels) {
  for (const item of dataByLevel[level]) {
    const word = getWord(item);
    const key = keyOf(word);
    if (!key.startsWith(targetLetter)) continue;

    if (!existingByKey.has(key)) existingByKey.set(key, item);
    if (!oxfordByKey.has(key) && !existingExtraLevel.has(key)) {
      existingExtraLevel.set(key, level);
    }
  }
}

const syncedItemsByLevel = Object.fromEntries(levels.map((level) => [level, []]));

for (const oxfordEntry of oxfordEntries) {
  const item = existingByKey.has(oxfordEntry.key)
    ? { ...existingByKey.get(oxfordEntry.key), "từ": oxfordEntry.word }
    : createEntry(oxfordEntry.word);
  syncedItemsByLevel[oxfordEntry.level].push(item);
}

for (const [key, level] of existingExtraLevel) {
  syncedItemsByLevel[level].push(existingByKey.get(key));
}

function firstLetterRank(item) {
  const letter = keyOf(getWord(item)).charAt(0);
  if (letter >= "a" && letter <= "z") return letter.charCodeAt(0);
  return Number.MAX_SAFE_INTEGER;
}

for (const level of levels) {
  const nonTargetItems = dataByLevel[level].filter((item) => !keyOf(getWord(item)).startsWith(targetLetter));
  const syncedItems = syncedItemsByLevel[level].sort((left, right) => getWord(left).localeCompare(getWord(right)));
  const targetRank = targetLetter.charCodeAt(0);
  const insertionIndex = nonTargetItems.findIndex((item) => firstLetterRank(item) > targetRank);
  const nextItems =
    insertionIndex === -1
      ? [...nonTargetItems, ...syncedItems]
      : [
          ...nonTargetItems.slice(0, insertionIndex),
          ...syncedItems,
          ...nonTargetItems.slice(insertionIndex),
        ];
  fs.writeFileSync(
    `data/${level}_vocab_partial_template.json`,
    `${JSON.stringify(nextItems, null, jsonIndent[level])}\n`,
  );
  fs.writeFileSync(
    `data/${level}_vocab_partial_template_words.txt`,
    `${nextItems.map((item) => getWord(item)).join("\n")}\n`,
  );
}

console.log(`Synced ${oxfordEntries.length} Oxford ${targetLetter.toUpperCase()} entries.`);
