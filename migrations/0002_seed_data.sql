-- Seed Data: 40+ recipes + growth knowledge
-- migrations/0002_seed_data.sql

-- ============================================================
-- RECIPES: Breakfast (早餐) - 15 recipes
-- ============================================================

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r001', '南瓜小米粥', 'breakfast', 12, 72, '["autumn","winter"]', 1, 20, '约3元', '软糯香甜，营养丰富，秋冬暖胃首选', '/placeholder.svg',
'[{"name":"小米","amount":"30克","category":"谷物"},{"name":"南瓜","amount":"50克","category":"蔬菜"},{"name":"清水","amount":"适量","category":"其他"}]',
'[{"stepNumber":1,"stepTitle":"准备食材","stepDescription":"小米淘洗干净，南瓜去皮去籽，切成小丁（约1厘米大小）","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"煮小米","stepDescription":"锅中加入适量清水，大火烧开后放入小米，转小火煮10分钟","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"加入南瓜","stepDescription":"放入南瓜丁，继续小火煮10分钟，期间偶尔搅拌防止粘锅","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"完成","stepDescription":"煮至南瓜软烂、粥变得浓稠即可关火，稍凉后盛出","stepImage":"/placeholder.svg"}]',
'["南瓜要切小一点，方便宝宝吞咽","粥不要太烫，温热即可喂食","12个月以下宝宝可以打成糊状"]',
'system', '南瓜小米粥', 0.9, 85, '["粥","秋冬","简单"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r002', '鸡蛋软饼', 'breakfast', 12, 72, '["spring","summer","autumn","winter"]', 1, 10, '约2元', '简单快手，蛋香浓郁，宝宝爱吃的手指食物', '/placeholder.svg',
'[{"name":"鸡蛋","amount":"1个","category":"蛋类"},{"name":"面粉","amount":"20克","category":"谷物"},{"name":"清水","amount":"少许","category":"其他"}]',
'[{"stepNumber":1,"stepTitle":"调面糊","stepDescription":"鸡蛋打散，加入面粉和少许清水，搅拌均匀成稀面糊，不要有面疙瘩","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"热锅","stepDescription":"不粘锅刷薄薄一层油，小火加热","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"煎饼","stepDescription":"倒入面糊，轻轻转动锅使面糊摊平，小火煎至底部凝固","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"翻面","stepDescription":"轻轻翻面，再煎30秒至两面金黄即可","stepImage":"/placeholder.svg"},{"stepNumber":5,"stepTitle":"切块","stepDescription":"取出放凉至温热，切成宝宝方便抓握的小条或小块","stepImage":"/placeholder.svg"}]',
'["全程小火，避免煎焦","不要加盐，保持原味","可以加一点点配方奶增加奶香"]',
'system', '鸡蛋软饼', 0.9, 88, '["饼","全年","快手"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r003', '红薯发糕', 'breakfast', 12, 72, '["autumn","winter"]', 2, 30, '约4元', '松软香甜不上火，天然甜味无需加糖', '/placeholder.svg',
'[{"name":"红薯","amount":"100克","category":"薯类"},{"name":"面粉","amount":"80克","category":"谷物"},{"name":"酵母","amount":"2克","category":"调味"},{"name":"温水","amount":"适量","category":"其他"}]',
'[{"stepNumber":1,"stepTitle":"蒸红薯","stepDescription":"红薯去皮切块，上锅蒸15分钟至软烂，取出用勺子压成泥","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"调面糊","stepDescription":"红薯泥中加入面粉和酵母，加少许温水搅拌成浓稠面糊","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"发酵","stepDescription":"盖上保鲜膜，放温暖处发酵30-40分钟，体积膨胀一倍","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"蒸制","stepDescription":"面糊倒入模具，冷水上锅，大火烧开后转中火蒸20分钟","stepImage":"/placeholder.svg"},{"stepNumber":5,"stepTitle":"完成","stepDescription":"关火后焖3分钟再开盖，取出放凉切块","stepImage":"/placeholder.svg"}]',
'["红薯本身有甜味，不需要额外加糖","发酵时间视室温调整","切成方便宝宝抓握的大小"]',
'system', '红薯发糕', 0.85, 80, '["糕点","秋冬","蒸"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r004', '香蕉燕麦饼', 'breakfast', 12, 72, '["spring","summer","autumn","winter"]', 1, 10, '约3元', '只需两种食材，零失败的快手早餐', '/placeholder.svg',
'[{"name":"香蕉","amount":"1根","category":"水果"},{"name":"即食燕麦","amount":"30克","category":"谷物"}]',
'[{"stepNumber":1,"stepTitle":"压香蕉","stepDescription":"香蕉去皮放入碗中，用叉子压成细腻的泥状","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"混合","stepDescription":"加入燕麦片，搅拌均匀，静置2分钟让燕麦吸收水分","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"煎制","stepDescription":"不粘锅小火加热，用勺子舀面糊放入锅中压成小饼，煎2分钟","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"翻面","stepDescription":"翻面再煎1-2分钟至两面金黄，盛出放温","stepImage":"/placeholder.svg"}]',
'["选择熟透的香蕉更甜更好压泥","全程小火慢煎","可以一次多做几个，冷冻保存"]',
'system', '香蕉燕麦饼', 0.9, 87, '["饼","全年","快手","零失败"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r005', '山药小馒头', 'breakfast', 12, 48, '["spring","summer","autumn","winter"]', 2, 25, '约3元', '松软好消化，适合刚开始吃主食的宝宝', '/placeholder.svg',
'[{"name":"山药","amount":"80克","category":"蔬菜"},{"name":"面粉","amount":"100克","category":"谷物"},{"name":"酵母","amount":"2克","category":"调味"}]',
'[{"stepNumber":1,"stepTitle":"蒸山药","stepDescription":"山药去皮切段，蒸15分钟至软烂，压成泥","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"和面","stepDescription":"山药泥加面粉和酵母，揉成光滑面团","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"发酵","stepDescription":"盖湿布发酵40分钟至两倍大","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"做馒头","stepDescription":"面团揉匀排气，搓成长条切成小剂子，揉成小圆球","stepImage":"/placeholder.svg"},{"stepNumber":5,"stepTitle":"蒸制","stepDescription":"冷水上锅，大火烧开转中火蒸15分钟，焖3分钟开盖","stepImage":"/placeholder.svg"}]',
'["山药去皮时戴手套防止手痒","做小一点方便宝宝自己抓着吃","蒸好焖一会再开盖防止回缩"]',
'system', '山药小馒头', 0.85, 78, '["主食","全年","蒸"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r006', '牛奶蒸蛋', 'breakfast', 12, 72, '["spring","summer","autumn","winter"]', 1, 15, '约3元', '嫩滑如布丁，补钙又补蛋白质', '/placeholder.svg',
'[{"name":"鸡蛋","amount":"1个","category":"蛋类"},{"name":"牛奶","amount":"80毫升","category":"奶类"}]',
'[{"stepNumber":1,"stepTitle":"打蛋","stepDescription":"鸡蛋打入碗中，充分打散","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"加奶","stepDescription":"倒入温牛奶，搅拌均匀","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"过滤","stepDescription":"用滤网过滤掉气泡和蛋筋，蛋液更细腻","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"蒸制","stepDescription":"盖上保鲜膜（扎几个小孔），冷水上锅中火蒸10-12分钟","stepImage":"/placeholder.svg"}]',
'["牛奶要用温的不要用热的，防止蛋液凝固","过滤这一步很关键，口感会更嫩","盖保鲜膜防止水滴落入"]',
'system', '牛奶蒸蛋', 0.9, 86, '["蒸蛋","全年","简单","补钙"]', 'published');

-- ============================================================
-- RECIPES: Lunch (午饭) - 15 recipes
-- ============================================================

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r101', '番茄鸡蛋面', 'lunch', 12, 72, '["spring","summer","autumn","winter"]', 1, 15, '约4元', '酸甜开胃，宝宝最爱的经典面食', '/placeholder.svg',
'[{"name":"番茄","amount":"1个","category":"蔬菜"},{"name":"鸡蛋","amount":"1个","category":"蛋类"},{"name":"宝宝面条","amount":"50克","category":"谷物"},{"name":"植物油","amount":"少许","category":"调味"}]',
'[{"stepNumber":1,"stepTitle":"处理番茄","stepDescription":"番茄顶部划十字，开水烫30秒后剥皮，切成小丁","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"炒番茄","stepDescription":"锅中放少许油，倒入番茄丁翻炒出汁，炒至软烂","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"加水煮面","stepDescription":"加入适量清水烧开，放入宝宝面条煮至软烂","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"加蛋花","stepDescription":"鸡蛋打散，淋入锅中，用筷子搅散成蛋花","stepImage":"/placeholder.svg"},{"stepNumber":5,"stepTitle":"完成","stepDescription":"煮1分钟至蛋花熟透，关火盛出，放温后喂食","stepImage":"/placeholder.svg"}]',
'["面条煮软一点，方便宝宝咀嚼","不需要加盐，番茄本身有味道","番茄要去皮去籽"]',
'system', '番茄鸡蛋面', 0.9, 90, '["面食","全年","经典"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r102', '胡萝卜肉末粥', 'lunch', 12, 36, '["spring","summer","autumn","winter"]', 1, 25, '约5元', '营养均衡的一碗粥，蛋白质和维生素都有了', '/placeholder.svg',
'[{"name":"大米","amount":"30克","category":"谷物"},{"name":"猪瘦肉末","amount":"20克","category":"肉类"},{"name":"胡萝卜","amount":"30克","category":"蔬菜"}]',
'[{"stepNumber":1,"stepTitle":"煮粥底","stepDescription":"大米洗净，加适量水大火烧开后转小火煮15分钟","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"处理配菜","stepDescription":"胡萝卜去皮切碎丁，猪肉末用开水焯一下去腥","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"加入配料","stepDescription":"粥煮至软烂后加入胡萝卜丁和肉末，搅匀","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"煮熟","stepDescription":"继续小火煮10分钟，直到胡萝卜和肉末完全熟透","stepImage":"/placeholder.svg"}]',
'["肉末要选瘦肉，先焯水去腥","胡萝卜切得越碎越好","12个月宝宝可以将粥打得更细"]',
'system', '胡萝卜肉末粥', 0.85, 83, '["粥","全年","营养"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r103', '西兰花虾仁意面', 'lunch', 18, 72, '["spring","summer","autumn","winter"]', 2, 20, '约8元', '高蛋白低脂肪，补钙补锌好选择', '/placeholder.svg',
'[{"name":"意面","amount":"50克","category":"谷物"},{"name":"鲜虾","amount":"5只","category":"海鲜"},{"name":"西兰花","amount":"3小朵","category":"蔬菜"},{"name":"橄榄油","amount":"少许","category":"调味"}]',
'[{"stepNumber":1,"stepTitle":"煮意面","stepDescription":"意面放入开水中煮至比包装建议时间多2分钟，更软烂","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"处理虾仁","stepDescription":"虾去壳去虾线，切成小丁，用少许柠檬汁去腥","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"焯西兰花","stepDescription":"西兰花掰成小朵，开水焯2分钟，捞出切碎","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"翻炒","stepDescription":"锅中放橄榄油，先炒虾仁至变色，加入西兰花碎翻炒","stepImage":"/placeholder.svg"},{"stepNumber":5,"stepTitle":"拌面","stepDescription":"放入煮好的意面，翻拌均匀即可","stepImage":"/placeholder.svg"}]',
'["确认宝宝不过敏虾类再做","虾线一定要去干净","意面煮软一点更好咀嚼"]',
'system', '西兰花虾仁意面', 0.85, 82, '["面食","全年","补钙"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r104', '土豆牛肉焖饭', 'lunch', 18, 72, '["autumn","winter"]', 2, 30, '约8元', '一锅出的懒人饭，荤素搭配营养全', '/placeholder.svg',
'[{"name":"大米","amount":"50克","category":"谷物"},{"name":"牛肉","amount":"30克","category":"肉类"},{"name":"土豆","amount":"半个","category":"蔬菜"},{"name":"胡萝卜","amount":"30克","category":"蔬菜"}]',
'[{"stepNumber":1,"stepTitle":"处理食材","stepDescription":"牛肉切小丁焯水去腥，土豆胡萝卜去皮切小丁","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"炒香","stepDescription":"锅中少许油，炒牛肉丁至变色，加入蔬菜丁翻炒","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"焖煮","stepDescription":"将炒好的料和洗净的大米放入电饭锅，加适量水，正常煮饭","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"焖饭","stepDescription":"煮好后再焖10分钟，打开搅拌均匀即可","stepImage":"/placeholder.svg"}]',
'["牛肉要选嫩一点的部位","切丁要小，方便宝宝咀嚼","水可以稍微多加一点，饭软一些"]',
'system', '土豆牛肉焖饭', 0.85, 80, '["米饭","秋冬","一锅出"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r105', '丝瓜鸡蛋汤面', 'lunch', 12, 72, '["summer"]', 1, 15, '约3元', '夏季清淡爽口，丝瓜鲜嫩好消化', '/placeholder.svg',
'[{"name":"丝瓜","amount":"半根","category":"蔬菜"},{"name":"鸡蛋","amount":"1个","category":"蛋类"},{"name":"宝宝面条","amount":"40克","category":"谷物"}]',
'[{"stepNumber":1,"stepTitle":"处理丝瓜","stepDescription":"丝瓜去皮去瓤，切成薄半月形小片","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"煮面","stepDescription":"水烧开后下面条煮至软烂，捞出备用","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"煮汤","stepDescription":"另起锅加水烧开，放入丝瓜煮3分钟至软","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"加蛋花","stepDescription":"鸡蛋打散淋入锅中，搅成蛋花，放入面条即可","stepImage":"/placeholder.svg"}]',
'["丝瓜要去干净皮和瓤","夏天吃很清爽开胃","面条要煮软一点"]',
'system', '丝瓜鸡蛋汤面', 0.9, 84, '["面食","夏季","清淡"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r106', '菠菜猪肝粥', 'lunch', 12, 48, '["spring","autumn"]', 2, 25, '约6元', '补铁好帮手，预防宝宝缺铁性贫血', '/placeholder.svg',
'[{"name":"大米","amount":"30克","category":"谷物"},{"name":"猪肝","amount":"15克","category":"内脏"},{"name":"菠菜","amount":"3片叶子","category":"蔬菜"}]',
'[{"stepNumber":1,"stepTitle":"处理猪肝","stepDescription":"猪肝用清水浸泡30分钟，切薄片后再切碎丁","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"焯菠菜","stepDescription":"菠菜洗净焯水1分钟去草酸，捞出切碎","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"煮粥","stepDescription":"大米加水煮至软烂成粥","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"加配料","stepDescription":"粥中加入猪肝碎，煮5分钟至完全熟透，最后加菠菜碎拌匀","stepImage":"/placeholder.svg"}]',
'["猪肝一定要浸泡去血水","菠菜必须焯水去草酸","猪肝不要给太多，每次一小块就够"]',
'system', '菠菜猪肝粥', 0.85, 81, '["粥","补铁","春秋"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r107', '冬瓜排骨汤饭', 'lunch', 18, 72, '["summer"]', 2, 30, '约10元', '夏日消暑好汤，排骨汤泡饭宝宝爱吃', '/placeholder.svg',
'[{"name":"排骨","amount":"3小块","category":"肉类"},{"name":"冬瓜","amount":"一小块","category":"蔬菜"},{"name":"米饭","amount":"小半碗","category":"谷物"}]',
'[{"stepNumber":1,"stepTitle":"焯排骨","stepDescription":"排骨冷水下锅焯水去血沫，捞出洗净","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"炖汤","stepDescription":"排骨加水大火烧开，转小火炖20分钟","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"加冬瓜","stepDescription":"冬瓜去皮切薄片，放入汤中煮10分钟至透明软烂","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"泡饭","stepDescription":"碗中放软米饭，浇上排骨冬瓜汤，汤泡饭即可","stepImage":"/placeholder.svg"}]',
'["排骨要焯水去腥","汤不要太油，可撇去浮油","冬瓜要煮到很软"]',
'system', '冬瓜排骨汤饭', 0.85, 79, '["汤饭","夏季","消暑"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r108', '豆腐蔬菜羹', 'lunch', 12, 36, '["spring","summer","autumn","winter"]', 1, 15, '约4元', '口感嫩滑好消化，豆腐补钙蔬菜补维生素', '/placeholder.svg',
'[{"name":"嫩豆腐","amount":"50克","category":"豆制品"},{"name":"胡萝卜","amount":"20克","category":"蔬菜"},{"name":"青菜","amount":"2片叶","category":"蔬菜"},{"name":"淀粉","amount":"少许","category":"其他"}]',
'[{"stepNumber":1,"stepTitle":"切食材","stepDescription":"豆腐切小丁，胡萝卜去皮切碎丁，青菜洗净切碎","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"煮汤","stepDescription":"锅中加水烧开，放入胡萝卜丁煮5分钟","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"加豆腐","stepDescription":"放入豆腐丁轻轻搅拌，煮3分钟","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"勾芡","stepDescription":"加入青菜碎，淀粉水勾薄芡，搅拌均匀即可","stepImage":"/placeholder.svg"}]',
'["豆腐要用嫩豆腐更好消化","轻轻搅拌避免豆腐碎太多","第一次吃豆腐注意观察有无过敏"]',
'system', '豆腐蔬菜羹', 0.9, 83, '["羹","全年","补钙","简单"]', 'published');

-- ============================================================
-- RECIPES: Dinner (晚饭) - 14 recipes
-- ============================================================

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r201', '蔬菜鸡肉小馄饨', 'dinner', 18, 72, '["spring","summer","autumn","winter"]', 2, 25, '约6元', '小小一口刚刚好，汤鲜味美宝宝吃不停', '/placeholder.svg',
'[{"name":"鸡胸肉","amount":"50克","category":"肉类"},{"name":"胡萝卜","amount":"20克","category":"蔬菜"},{"name":"香菇","amount":"1个","category":"蔬菜"},{"name":"馄饨皮","amount":"15张","category":"谷物"}]',
'[{"stepNumber":1,"stepTitle":"做馅料","stepDescription":"鸡胸肉剁成泥，胡萝卜和香菇切碎末，混合搅拌均匀","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"包馄饨","stepDescription":"取一张馄饨皮放少许馅，对折捏紧，不用包太多馅","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"煮馄饨","stepDescription":"水烧开后下馄饨，煮至浮起后再煮2分钟","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"完成","stepDescription":"连汤带馄饨盛出，稍凉后即可喂食","stepImage":"/placeholder.svg"}]',
'["馅不要包太多防止煮破","鸡肉要剁得很细","汤不要太烫再喂"]',
'system', '蔬菜鸡肉小馄饨', 0.85, 82, '["馄饨","全年","手工"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r202', '蛋黄焗南瓜', 'dinner', 12, 72, '["autumn","winter"]', 1, 15, '约4元', '咸蛋黄香浓裹南瓜，秋冬暖心小菜', '/placeholder.svg',
'[{"name":"南瓜","amount":"100克","category":"蔬菜"},{"name":"咸蛋黄","amount":"1个","category":"蛋类"},{"name":"植物油","amount":"少许","category":"调味"}]',
'[{"stepNumber":1,"stepTitle":"蒸南瓜","stepDescription":"南瓜去皮去籽，切成小条状，上锅蒸8分钟至刚熟","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"处理蛋黄","stepDescription":"咸蛋黄蒸熟后用勺子压碎成粉末状","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"炒制","stepDescription":"锅中放少许油，小火炒蛋黄碎至起泡冒沫","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"裹南瓜","stepDescription":"放入蒸好的南瓜条，轻轻翻炒使蛋黄均匀裹住南瓜","stepImage":"/placeholder.svg"}]',
'["南瓜不要蒸太软会碎","翻炒要轻柔","咸蛋黄本身有盐不用再加"]',
'system', '蛋黄焗南瓜', 0.85, 80, '["小菜","秋冬","下饭"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r203', '鳕鱼蒸蛋', 'dinner', 12, 48, '["spring","summer","autumn","winter"]', 1, 15, '约10元', 'DHA丰富促进大脑发育，嫩滑好吸收', '/placeholder.svg',
'[{"name":"鳕鱼","amount":"30克","category":"海鲜"},{"name":"鸡蛋","amount":"1个","category":"蛋类"},{"name":"温水","amount":"蛋液1.5倍","category":"其他"}]',
'[{"stepNumber":1,"stepTitle":"处理鳕鱼","stepDescription":"鳕鱼去皮去骨，用柠檬汁腌5分钟去腥，切小丁","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"打蛋液","stepDescription":"鸡蛋打散加温水搅匀，过滤去泡沫","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"摆鱼丁","stepDescription":"蛋液倒入碗中，鳕鱼丁均匀放在蛋液上","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"蒸制","stepDescription":"盖保鲜膜扎孔，冷水上锅中火蒸12分钟","stepImage":"/placeholder.svg"}]',
'["一定要仔细检查鱼骨","第一次吃鱼注意过敏观察","蛋液过滤后口感更嫩滑"]',
'system', '鳕鱼蒸蛋', 0.9, 85, '["蒸蛋","全年","补脑","DHA"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r204', '西红柿牛肉汤', 'dinner', 18, 72, '["spring","summer","autumn","winter"]', 2, 25, '约8元', '酸甜可口的浓汤，搭配米饭或面条都好吃', '/placeholder.svg',
'[{"name":"牛肉","amount":"30克","category":"肉类"},{"name":"番茄","amount":"1个","category":"蔬菜"},{"name":"土豆","amount":"半个","category":"蔬菜"}]',
'[{"stepNumber":1,"stepTitle":"焯牛肉","stepDescription":"牛肉切小丁，冷水下锅焯水捞出洗净","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"炒番茄","stepDescription":"番茄去皮切碎丁，锅中少许油炒出汤汁","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"炖煮","stepDescription":"加入牛肉丁和切丁的土豆，加水没过食材，大火烧开转小火","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"慢炖","stepDescription":"小火炖20分钟至牛肉软烂，土豆绵软即可","stepImage":"/placeholder.svg"}]',
'["牛肉切小丁更容易煮烂","土豆煮软后会让汤更浓稠","可以配软米饭一起吃"]',
'system', '西红柿牛肉汤', 0.85, 81, '["汤","全年","补铁"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r205', '紫薯银耳羹', 'dinner', 12, 72, '["spring","summer"]', 1, 25, '约5元', '甜润可口，春夏润燥好甜品', '/placeholder.svg',
'[{"name":"紫薯","amount":"半个","category":"薯类"},{"name":"银耳","amount":"半朵","category":"干货"},{"name":"冰糖","amount":"少许","category":"调味"}]',
'[{"stepNumber":1,"stepTitle":"泡银耳","stepDescription":"银耳提前泡发1小时，撕成小朵去掉根部","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"煮银耳","stepDescription":"银耳加水大火烧开转小火煮20分钟至软糯出胶","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"加紫薯","stepDescription":"紫薯去皮切小丁，放入锅中继续煮10分钟","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"调味","stepDescription":"加少许冰糖搅拌融化即可（1岁以上可加，量要少）","stepImage":"/placeholder.svg"}]',
'["银耳要泡发充分才好煮","冰糖少放一点就好","紫薯会让汤变成紫色很好看"]',
'system', '紫薯银耳羹', 0.85, 79, '["甜品","春夏","润燥"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r206', '虾皮紫菜蛋花汤', 'dinner', 12, 72, '["spring","summer","autumn","winter"]', 1, 10, '约3元', '简单快手补钙汤，5分钟搞定', '/placeholder.svg',
'[{"name":"虾皮","amount":"一小撮","category":"海鲜"},{"name":"紫菜","amount":"一小片","category":"海鲜"},{"name":"鸡蛋","amount":"1个","category":"蛋类"}]',
'[{"stepNumber":1,"stepTitle":"准备","stepDescription":"虾皮冲洗两遍，紫菜撕成小块，鸡蛋打散","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"煮汤","stepDescription":"锅中加水烧开，放入虾皮和紫菜煮2分钟","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"加蛋花","stepDescription":"淋入蛋液，用筷子搅成蛋花","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"完成","stepDescription":"煮1分钟关火，滴几滴香油即可","stepImage":"/placeholder.svg"}]',
'["虾皮要洗一下去盐分","紫菜撕小一点方便宝宝喝","非常简单适合忙碌的时候做"]',
'system', '虾皮紫菜蛋花汤', 0.9, 84, '["汤","全年","快手","补钙"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r207', '山药排骨汤', 'dinner', 18, 72, '["autumn","winter"]', 2, 30, '约10元', '秋冬滋补好汤，健脾养胃助消化', '/placeholder.svg',
'[{"name":"排骨","amount":"3-4块","category":"肉类"},{"name":"铁棍山药","amount":"半根","category":"蔬菜"},{"name":"姜片","amount":"2片","category":"调味"}]',
'[{"stepNumber":1,"stepTitle":"焯排骨","stepDescription":"排骨冷水下锅，加姜片焯水5分钟，捞出洗净浮沫","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"炖排骨","stepDescription":"砂锅加水放入排骨和姜片，大火烧开转小火炖20分钟","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"加山药","stepDescription":"山药去皮切滚刀块，放入汤中继续炖15分钟","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"完成","stepDescription":"山药炖至软糯入味即可关火，盛汤时撇去表面浮油","stepImage":"/placeholder.svg"}]',
'["山药去皮戴手套防止手痒","汤表面的浮油撇掉再给宝宝喝","排骨肉可以撕碎给宝宝吃"]',
'system', '山药排骨汤', 0.85, 80, '["汤","秋冬","滋补"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r208', '蒸三鲜蛋饺', 'dinner', 18, 72, '["spring","summer","autumn","winter"]', 2, 25, '约7元', '造型可爱有食欲，蛋皮包裹肉馅鲜嫩多汁', '/placeholder.svg',
'[{"name":"鸡蛋","amount":"2个","category":"蛋类"},{"name":"猪肉末","amount":"30克","category":"肉类"},{"name":"胡萝卜","amount":"20克","category":"蔬菜"},{"name":"香菇","amount":"1个","category":"蔬菜"}]',
'[{"stepNumber":1,"stepTitle":"做馅","stepDescription":"猪肉末加胡萝卜碎和香菇碎，搅拌均匀","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"摊蛋皮","stepDescription":"鸡蛋打散，不粘锅小火摊成薄蛋皮","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"包蛋饺","stepDescription":"蛋皮切圆形，放一勺馅对折捏紧边缘","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"蒸制","stepDescription":"蛋饺摆盘，上锅大火蒸10分钟至馅料熟透","stepImage":"/placeholder.svg"}]',
'["蛋皮要薄，火要小","馅不要放太多容易破","蒸熟后可以蘸少许酱油吃（大宝宝）"]',
'system', '蒸三鲜蛋饺', 0.85, 78, '["蛋饺","全年","手工"]', 'published');

-- More breakfast recipes for variety
INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r007', '胡萝卜鸡蛋饼', 'breakfast', 12, 72, '["spring","summer","autumn","winter"]', 1, 10, '约2元', '色彩鲜艳有食欲，胡萝卜补充维生素A', '/placeholder.svg',
'[{"name":"胡萝卜","amount":"30克","category":"蔬菜"},{"name":"鸡蛋","amount":"1个","category":"蛋类"},{"name":"面粉","amount":"20克","category":"谷物"}]',
'[{"stepNumber":1,"stepTitle":"擦丝","stepDescription":"胡萝卜去皮擦成细丝，越细越好","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"调糊","stepDescription":"鸡蛋打散，加入胡萝卜丝和面粉搅拌均匀","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"煎饼","stepDescription":"不粘锅刷薄油，小火倒入面糊摊平，煎至两面金黄","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"切块","stepDescription":"放温后切成小条方便宝宝抓握","stepImage":"/placeholder.svg"}]',
'["胡萝卜丝越细口感越好","全程小火","可以加少许葱花增香（大宝宝）"]',
'system', '胡萝卜鸡蛋饼', 0.9, 86, '["饼","全年","补VA"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r008', '小米红枣粥', 'breakfast', 12, 72, '["autumn","winter"]', 1, 25, '约3元', '养胃暖身，红枣自然甜味宝宝爱喝', '/placeholder.svg',
'[{"name":"小米","amount":"30克","category":"谷物"},{"name":"红枣","amount":"3颗","category":"干果"},{"name":"清水","amount":"适量","category":"其他"}]',
'[{"stepNumber":1,"stepTitle":"处理红枣","stepDescription":"红枣洗净去核，切成小碎丁","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"煮粥","stepDescription":"小米洗净加水大火烧开，转小火","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"加红枣","stepDescription":"放入红枣碎，继续小火煮15-20分钟","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"完成","stepDescription":"煮至粥浓稠、红枣软烂即可","stepImage":"/placeholder.svg"}]',
'["红枣一定要去核","红枣切碎防止噎到","不需要加糖红枣本身就甜"]',
'system', '小米红枣粥', 0.9, 84, '["粥","秋冬","养胃"]', 'published');

-- More lunch recipes
INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r109', '蔬菜蛋炒饭', 'lunch', 18, 72, '["spring","summer","autumn","winter"]', 1, 10, '约3元', '隔夜饭最佳归宿，快手又营养', '/placeholder.svg',
'[{"name":"米饭","amount":"小半碗","category":"谷物"},{"name":"鸡蛋","amount":"1个","category":"蛋类"},{"name":"豌豆","amount":"一小把","category":"蔬菜"},{"name":"胡萝卜丁","amount":"少许","category":"蔬菜"}]',
'[{"stepNumber":1,"stepTitle":"炒蛋","stepDescription":"鸡蛋打散，锅中少许油炒散盛出","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"炒蔬菜","stepDescription":"锅中放少许油，炒豌豆和胡萝卜丁至熟","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"炒饭","stepDescription":"放入米饭翻炒散开，加入鸡蛋碎","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"完成","stepDescription":"翻炒均匀即可出锅","stepImage":"/placeholder.svg"}]',
'["米饭用隔夜饭更容易炒散","蔬菜切小丁","油要少放"]',
'system', '蔬菜蛋炒饭', 0.9, 85, '["炒饭","全年","快手"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r110', '鸡肉蔬菜粥', 'lunch', 12, 36, '["spring","summer","autumn","winter"]', 1, 25, '约5元', '鸡肉嫩滑好消化，蔬菜营养一碗全', '/placeholder.svg',
'[{"name":"大米","amount":"30克","category":"谷物"},{"name":"鸡胸肉","amount":"20克","category":"肉类"},{"name":"玉米粒","amount":"一小把","category":"蔬菜"},{"name":"青菜","amount":"2叶","category":"蔬菜"}]',
'[{"stepNumber":1,"stepTitle":"煮粥","stepDescription":"大米加水煮至软烂","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"处理鸡肉","stepDescription":"鸡胸肉煮熟后撕成细丝再切碎","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"加配料","stepDescription":"粥中加入鸡肉碎和玉米粒煮5分钟","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"加青菜","stepDescription":"最后加入切碎的青菜叶，煮2分钟即可","stepImage":"/placeholder.svg"}]',
'["鸡胸肉顺着纹理撕更嫩","玉米粒要煮软","青菜最后放保持颜色"]',
'system', '鸡肉蔬菜粥', 0.9, 83, '["粥","全年","营养均衡"]', 'published');

-- More dinner recipes
INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r209', '番茄豆腐汤', 'dinner', 12, 72, '["spring","summer","autumn","winter"]', 1, 15, '约4元', '酸甜开胃，豆腐嫩滑补钙又补蛋白', '/placeholder.svg',
'[{"name":"番茄","amount":"1个","category":"蔬菜"},{"name":"嫩豆腐","amount":"半块","category":"豆制品"},{"name":"鸡蛋","amount":"1个","category":"蛋类"}]',
'[{"stepNumber":1,"stepTitle":"处理番茄","stepDescription":"番茄去皮切碎丁","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"炒番茄","stepDescription":"少许油炒番茄至出汁","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"加豆腐","stepDescription":"加水烧开，豆腐切小丁放入煮3分钟","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"加蛋花","stepDescription":"蛋液打散淋入搅成蛋花，煮开即可","stepImage":"/placeholder.svg"}]',
'["豆腐用嫩豆腐口感更好","番茄要炒出汁才好喝","轻轻搅拌避免豆腐碎"]',
'system', '番茄豆腐汤', 0.9, 82, '["汤","全年","补钙","简单"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r210', '清蒸鲈鱼', 'dinner', 12, 72, '["spring","summer","autumn","winter"]', 1, 15, '约15元', 'DHA丰富刺少肉嫩，宝宝吃鱼首选', '/placeholder.svg',
'[{"name":"鲈鱼","amount":"一小段","category":"海鲜"},{"name":"姜","amount":"2片","category":"调味"},{"name":"葱","amount":"少许","category":"调味"}]',
'[{"stepNumber":1,"stepTitle":"处理鱼","stepDescription":"鲈鱼切一小段，清洗干净，两面各划两刀","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"去腥","stepDescription":"鱼身放姜片和葱段","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"蒸制","stepDescription":"水烧开后放入鱼，大火蒸8-10分钟","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"完成","stepDescription":"取出去掉姜葱，用筷子把鱼肉拆成小块，仔细去刺","stepImage":"/placeholder.svg"}]',
'["一定一定要仔细检查鱼刺","鲈鱼刺少是宝宝吃鱼的好选择","蒸的时间不要太长肉会老"]',
'system', '清蒸鲈鱼', 0.9, 83, '["鱼","全年","DHA","补脑"]', 'published');

-- Additional recipes for spring/summer
INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r009', '草莓酸奶燕麦杯', 'breakfast', 18, 72, '["spring"]', 1, 5, '约6元', '春季限定，颜色漂亮又好吃的快手早餐', '/placeholder.svg',
'[{"name":"酸奶","amount":"100克","category":"奶类"},{"name":"燕麦","amount":"20克","category":"谷物"},{"name":"草莓","amount":"3颗","category":"水果"}]',
'[{"stepNumber":1,"stepTitle":"铺燕麦","stepDescription":"杯底铺一层即食燕麦","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"加酸奶","stepDescription":"倒入酸奶铺平","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"加草莓","stepDescription":"草莓洗净切小块，摆在酸奶上","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"完成","stepDescription":"可以再撒一些燕麦在最上面，即可食用","stepImage":"/placeholder.svg"}]',
'["草莓要洗干净","酸奶选无糖或低糖的","可替换成当季其他水果"]',
'system', '草莓酸奶燕麦杯', 0.9, 82, '["早餐","春季","免煮","快手"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r111', '黄瓜鸡蛋凉面', 'lunch', 24, 72, '["summer"]', 1, 15, '约3元', '夏天没食欲就吃这个，清凉爽口宝宝爱', '/placeholder.svg',
'[{"name":"面条","amount":"50克","category":"谷物"},{"name":"黄瓜","amount":"半根","category":"蔬菜"},{"name":"鸡蛋","amount":"1个","category":"蛋类"},{"name":"芝麻酱","amount":"少许","category":"调味"}]',
'[{"stepNumber":1,"stepTitle":"煮面","stepDescription":"面条煮软捞出过凉开水，沥干","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"切配菜","stepDescription":"黄瓜切细丝，鸡蛋摊成蛋皮切丝","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"调酱","stepDescription":"芝麻酱加少许温水调稀","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"拌面","stepDescription":"面条放碗中，铺上黄瓜丝和蛋皮丝，淋上芝麻酱","stepImage":"/placeholder.svg"}]',
'["面条过凉开水不是生水","黄瓜丝切细一点","芝麻酱不要放太多"]',
'system', '黄瓜鸡蛋凉面', 0.85, 81, '["面食","夏季","清凉"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r211', '玉米排骨汤', 'dinner', 18, 72, '["autumn","winter"]', 1, 30, '约10元', '甜玉米配排骨，自然鲜甜不需调味', '/placeholder.svg',
'[{"name":"排骨","amount":"3-4块","category":"肉类"},{"name":"甜玉米","amount":"半根","category":"蔬菜"},{"name":"姜","amount":"2片","category":"调味"}]',
'[{"stepNumber":1,"stepTitle":"焯排骨","stepDescription":"排骨冷水下锅焯水5分钟去血沫，捞出洗净","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"切玉米","stepDescription":"玉米切小段","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"炖煮","stepDescription":"排骨玉米姜片一起放入锅中，加水大火烧开转小火炖25分钟","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"完成","stepDescription":"炖至排骨软烂，玉米甜香即可","stepImage":"/placeholder.svg"}]',
'["排骨要焯水去腥","玉米选甜玉米更好喝","汤面浮油撇去再给宝宝喝"]',
'system', '玉米排骨汤', 0.85, 80, '["汤","秋冬","简单"]', 'published');

-- Even more recipes for additional coverage
INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r010', '奶香玉米糊', 'breakfast', 12, 24, '["spring","summer","autumn","winter"]', 1, 10, '约3元', '香甜顺滑，适合小月龄宝宝的过渡辅食', '/placeholder.svg',
'[{"name":"甜玉米粒","amount":"50克","category":"蔬菜"},{"name":"配方奶","amount":"60毫升","category":"奶类"}]',
'[{"stepNumber":1,"stepTitle":"煮玉米","stepDescription":"玉米粒加少量水煮8分钟至软","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"打糊","stepDescription":"煮熟的玉米加配方奶用料理机打成细腻糊状","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"过滤","stepDescription":"用细网筛过滤掉玉米皮渣","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"完成","stepDescription":"温度合适即可喂食","stepImage":"/placeholder.svg"}]',
'["一定要过滤玉米皮渣","用甜玉米不用老玉米","温度要合适不能太烫"]',
'system', '奶香玉米糊', 0.9, 82, '["糊","全年","小月龄"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r112', '彩椒鸡丁', 'lunch', 24, 72, '["spring","summer","autumn","winter"]', 1, 15, '约7元', '色彩缤纷有食欲，鸡肉嫩滑好咀嚼', '/placeholder.svg',
'[{"name":"鸡胸肉","amount":"50克","category":"肉类"},{"name":"红彩椒","amount":"半个","category":"蔬菜"},{"name":"黄彩椒","amount":"半个","category":"蔬菜"},{"name":"淀粉","amount":"少许","category":"其他"}]',
'[{"stepNumber":1,"stepTitle":"腌鸡肉","stepDescription":"鸡胸肉切小丁，加少许淀粉抓匀腌5分钟","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"切彩椒","stepDescription":"彩椒去籽切小丁","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"炒鸡丁","stepDescription":"锅中少许油，炒鸡丁至变色","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"加彩椒","stepDescription":"加入彩椒丁翻炒2分钟至断生即可","stepImage":"/placeholder.svg"}]',
'["鸡丁切小一点更嫩","淀粉腌制让鸡肉更嫩滑","彩椒不要炒太久保持脆嫩"]',
'system', '彩椒鸡丁', 0.85, 80, '["炒菜","全年","高蛋白"]', 'published');

INSERT INTO recipes (id, name, meal_type, min_age_months, max_age_months, suitable_seasons, difficulty_level, cook_time_minutes, estimated_price_text, summary_text, cover_image, ingredient_list, step_list, tips, source_platform, source_title, source_quality_score, recommendation_score, tags, status) VALUES
('r212', '蒸水蛋配虾仁', 'dinner', 12, 72, '["spring","summer","autumn","winter"]', 1, 15, '约8元', '嫩滑蒸蛋上铺虾仁，简单但很有营养', '/placeholder.svg',
'[{"name":"鸡蛋","amount":"1个","category":"蛋类"},{"name":"鲜虾","amount":"3只","category":"海鲜"},{"name":"温水","amount":"蛋液1.5倍","category":"其他"}]',
'[{"stepNumber":1,"stepTitle":"打蛋","stepDescription":"鸡蛋打散加温水搅匀过滤","stepImage":"/placeholder.svg"},{"stepNumber":2,"stepTitle":"处理虾","stepDescription":"虾去壳去线切小段","stepImage":"/placeholder.svg"},{"stepNumber":3,"stepTitle":"蒸蛋","stepDescription":"蛋液盖保鲜膜中火蒸8分钟至半凝固","stepImage":"/placeholder.svg"},{"stepNumber":4,"stepTitle":"加虾","stepDescription":"打开放上虾仁，再蒸5分钟至熟","stepImage":"/placeholder.svg"}]',
'["虾线一定去干净","确认不过敏再加虾","蛋液过滤口感更嫩"]',
'system', '蒸水蛋配虾仁', 0.9, 84, '["蒸蛋","全年","补钙","DHA"]', 'published');

-- ============================================================
-- GROWTH KNOWLEDGE: Height & Weight Standards
-- ============================================================

INSERT INTO growth_knowledge (id, category, gender, min_age_months, max_age_months, title, content, sort_order) VALUES
('hw-m-01', 'height_weight', 'male', 0, 3, '0-3个月', '55.5-65.0|4.0-7.0', 1),
('hw-m-02', 'height_weight', 'male', 4, 6, '4-6个月', '63.0-71.0|6.0-9.0', 2),
('hw-m-03', 'height_weight', 'male', 7, 9, '7-9个月', '67.5-75.5|7.5-10.5', 3),
('hw-m-04', 'height_weight', 'male', 10, 12, '10-12个月', '71.0-79.0|8.5-11.5', 4),
('hw-m-05', 'height_weight', 'male', 13, 18, '13-18个月', '74.0-85.0|9.0-12.5', 5),
('hw-m-06', 'height_weight', 'male', 19, 24, '19-24个月', '80.0-92.0|10.0-14.0', 6),
('hw-m-07', 'height_weight', 'male', 25, 36, '2-3岁', '85.0-100.0|11.0-16.5', 7),
('hw-m-08', 'height_weight', 'male', 37, 48, '3-4岁', '92.0-107.0|12.5-18.5', 8),
('hw-m-09', 'height_weight', 'male', 49, 60, '4-5岁', '98.0-114.0|14.0-21.0', 9),
('hw-m-10', 'height_weight', 'male', 61, 72, '5-6岁', '104.0-120.0|15.5-23.5', 10);

INSERT INTO growth_knowledge (id, category, gender, min_age_months, max_age_months, title, content, sort_order) VALUES
('hw-f-01', 'height_weight', 'female', 0, 3, '0-3个月', '54.5-63.5|3.5-6.5', 1),
('hw-f-02', 'height_weight', 'female', 4, 6, '4-6个月', '61.5-69.5|5.5-8.5', 2),
('hw-f-03', 'height_weight', 'female', 7, 9, '7-9个月', '66.0-74.0|7.0-10.0', 3),
('hw-f-04', 'height_weight', 'female', 10, 12, '10-12个月', '69.5-77.5|8.0-11.0', 4),
('hw-f-05', 'height_weight', 'female', 13, 18, '13-18个月', '72.5-83.5|8.5-12.0', 5),
('hw-f-06', 'height_weight', 'female', 19, 24, '19-24个月', '78.5-90.5|9.5-13.5', 6),
('hw-f-07', 'height_weight', 'female', 25, 36, '2-3岁', '83.5-98.0|10.5-16.0', 7),
('hw-f-08', 'height_weight', 'female', 37, 48, '3-4岁', '90.5-105.5|12.0-18.0', 8),
('hw-f-09', 'height_weight', 'female', 49, 60, '4-5岁', '97.0-112.5|13.5-20.5', 9),
('hw-f-10', 'height_weight', 'female', 61, 72, '5-6岁', '103.0-119.0|15.0-22.5', 10);

-- ============================================================
-- GROWTH KNOWLEDGE: Feeding Notes (喂养注意事项)
-- ============================================================

INSERT INTO growth_knowledge (id, category, gender, min_age_months, max_age_months, title, content, sort_order) VALUES
('fn-01', 'feeding_notes', 'all', 0, 6, '0-6个月', '["纯母乳或配方奶喂养为主","按需喂养，不要强迫定时定量","注意观察宝宝的饥饿和饱足信号","母乳喂养的妈妈注意营养均衡","配方奶要按说明冲调，不要过浓过淡","4-6个月可观察是否有添加辅食的信号","保持喂养环境安静舒适"]', 1),
('fn-02', 'feeding_notes', 'all', 7, 12, '7-12个月', '["开始添加辅食，从含铁米粉开始","每次只添加一种新食物，观察3天有无过敏","辅食从泥状逐渐过渡到碎末状","保证每天600-800毫升奶量","鼓励宝宝自己用手抓食物","不要在辅食中加盐和糖","注意食物温度，防止烫伤","食物要煮熟煮透"]', 2),
('fn-03', 'feeding_notes', 'all', 13, 24, '1-2岁', '["逐渐过渡到和家人一起吃饭","保证每天400-500毫升奶量","食物种类要丰富，荤素搭配","可以开始吃小块状食物锻炼咀嚼","培养规律的三餐两点习惯","不要追着喂，让宝宝自主进食","控制零食量，不影响正餐","少盐少糖少油"]', 3),
('fn-04', 'feeding_notes', 'all', 25, 48, '2-4岁', '["三餐两点规律进食","每天保证300-400毫升奶量","每天吃一个鸡蛋","适量吃鱼虾肉类补充蛋白质","多吃蔬菜水果","主食粗细搭配","限制含糖饮料和零食","让孩子参与做饭激发兴趣"]', 4),
('fn-05', 'feeding_notes', 'all', 49, 72, '4-6岁', '["培养独立进食能力","三餐定时定量，加餐合理","营养均衡五大类食物都要吃","每天饮水600-800毫升","控制甜食和油炸食品","教孩子认识食物和营养","养成不挑食的好习惯","注意用餐礼仪培养"]', 5);

-- ============================================================
-- GROWTH KNOWLEDGE: Forbidden Foods (禁止喂养内容)
-- ============================================================

INSERT INTO growth_knowledge (id, category, gender, min_age_months, max_age_months, title, content, sort_order) VALUES
('ff-01', 'forbidden_foods', 'all', 0, 12, '0-12个月', '["绝对不能吃蜂蜜（肉毒杆菌风险）","不能吃整颗坚果（窒息风险）","不能加盐和酱油调味","不能喝果汁代替水果","不能吃腌制食品","不能喝鲜牛奶（消化不了）","不能吃蛋清（6个月内）","不能吃含咖啡因食物"]', 1),
('ff-02', 'forbidden_foods', 'all', 13, 24, '1-2岁', '["继续避免整颗坚果和硬糖（窒息风险）","不能喝茶和咖啡","少吃腌制和加工肉类","避免高盐零食如薯片","不能吃生的鱼片和肉类","避免含反式脂肪的食品","不要给果冻类食物（窒息风险）","蜂蜜1岁后可少量尝试"]', 2),
('ff-03', 'forbidden_foods', 'all', 25, 48, '2-4岁', '["继续注意坚果要碾碎食用","限制含糖饮料如可乐汽水","避免油炸食品过多","不要吃太辣的食物","限制巧克力和咖啡因食品","避免生鸡蛋和半生肉类","不吃路边摊不卫生食物","限制方便面等高钠食品"]', 3),
('ff-04', 'forbidden_foods', 'all', 49, 72, '4-6岁', '["继续限制含糖碳酸饮料","避免过量零食影响正餐","不吃不新鲜的海鲜","限制腌制和烟熏食品","注意食物过敏源","不要暴饮暴食","避免过度辛辣刺激食物","不喝含咖啡因饮料"]', 4);

-- ============================================================
-- INITIAL RECOMMENDATIONS (for immediate display)
-- ============================================================

INSERT INTO recommendations (id, recipe_id, age_group, season, meal_type, score, is_featured, feed_rank, reason) VALUES
('rec-001', 'r002', '12-18', 'spring', 'breakfast', 88, 1, NULL, '简单快手，适合宝宝的手指食物'),
('rec-002', 'r004', '12-18', 'spring', 'breakfast', 87, 1, NULL, '只需两种食材，零失败'),
('rec-003', 'r006', '12-18', 'spring', 'breakfast', 86, 1, NULL, '嫩滑如布丁，补钙又补蛋白'),
('rec-004', 'r007', '12-18', 'spring', 'breakfast', 86, 1, NULL, '色彩鲜艳补充维生素A'),
('rec-005', 'r009', '12-18', 'spring', 'breakfast', 82, 1, NULL, '春季限定水果早餐'),
('rec-006', 'r101', '12-18', 'spring', 'lunch', 90, 1, NULL, '经典酸甜面食宝宝爱吃'),
('rec-007', 'r102', '12-18', 'spring', 'lunch', 83, 1, NULL, '营养均衡的一碗粥'),
('rec-008', 'r108', '12-18', 'spring', 'lunch', 83, 1, NULL, '豆腐补钙蔬菜补维生素'),
('rec-009', 'r110', '12-18', 'spring', 'lunch', 83, 1, NULL, '鸡肉嫩滑好消化'),
('rec-010', 'r106', '12-18', 'spring', 'lunch', 81, 1, NULL, '补铁预防贫血'),
('rec-011', 'r203', '12-18', 'spring', 'dinner', 85, 1, NULL, 'DHA丰富促进大脑发育'),
('rec-012', 'r206', '12-18', 'spring', 'dinner', 84, 1, NULL, '快手补钙汤'),
('rec-013', 'r209', '12-18', 'spring', 'dinner', 82, 1, NULL, '酸甜开胃补钙'),
('rec-014', 'r212', '12-18', 'spring', 'dinner', 84, 1, NULL, '嫩滑蒸蛋营养丰富'),
('rec-015', 'r210', '12-18', 'spring', 'dinner', 83, 1, NULL, 'DHA丰富刺少肉嫩');

-- Feed items for 12-18 month spring
INSERT INTO recommendations (id, recipe_id, age_group, season, meal_type, score, is_featured, feed_rank, reason) VALUES
('rec-f01', 'r001', '12-18', 'spring', 'breakfast', 75, 0, 1, '软糯香甜营养丰富'),
('rec-f02', 'r003', '12-18', 'spring', 'breakfast', 74, 0, 2, '松软香甜不上火'),
('rec-f03', 'r005', '12-18', 'spring', 'breakfast', 73, 0, 3, '松软好消化'),
('rec-f04', 'r010', '12-18', 'spring', 'breakfast', 72, 0, 4, '香甜顺滑'),
('rec-f05', 'r104', '12-18', 'spring', 'lunch', 70, 0, 5, '一锅出懒人饭'),
('rec-f06', 'r201', '12-18', 'spring', 'dinner', 69, 0, 6, '小馄饨汤鲜味美'),
('rec-f07', 'r205', '12-18', 'spring', 'dinner', 68, 0, 7, '甜润可口润燥'),
('rec-f08', 'r202', '12-18', 'spring', 'dinner', 67, 0, 8, '秋冬暖心小菜');

-- Recommendations for other key age groups
INSERT INTO recommendations (id, recipe_id, age_group, season, meal_type, score, is_featured, feed_rank, reason) VALUES
('rec-020', 'r002', '25-36', 'spring', 'breakfast', 88, 1, NULL, '简单快手蛋香浓郁'),
('rec-021', 'r004', '25-36', 'spring', 'breakfast', 87, 1, NULL, '零失败快手早餐'),
('rec-022', 'r007', '25-36', 'spring', 'breakfast', 86, 1, NULL, '色彩鲜艳有食欲'),
('rec-023', 'r009', '25-36', 'spring', 'breakfast', 82, 1, NULL, '春季水果早餐'),
('rec-024', 'r101', '25-36', 'spring', 'lunch', 90, 1, NULL, '经典番茄鸡蛋面'),
('rec-025', 'r109', '25-36', 'spring', 'lunch', 85, 1, NULL, '快手蛋炒饭'),
('rec-026', 'r103', '25-36', 'spring', 'lunch', 82, 1, NULL, '高蛋白补钙补锌'),
('rec-027', 'r112', '25-36', 'spring', 'lunch', 80, 1, NULL, '色彩缤纷有食欲'),
('rec-028', 'r210', '25-36', 'spring', 'dinner', 83, 1, NULL, 'DHA丰富刺少'),
('rec-029', 'r206', '25-36', 'spring', 'dinner', 84, 1, NULL, '快手补钙汤'),
('rec-030', 'r209', '25-36', 'spring', 'dinner', 82, 1, NULL, '酸甜开胃'),
('rec-031', 'r204', '25-36', 'spring', 'dinner', 81, 1, NULL, '酸甜浓汤下饭'),
('rec-032', 'r212', '25-36', 'spring', 'dinner', 84, 1, NULL, '嫩滑蒸蛋虾仁');

-- Feed for 25-36 spring
INSERT INTO recommendations (id, recipe_id, age_group, season, meal_type, score, is_featured, feed_rank, reason) VALUES
('rec-f20', 'r001', '25-36', 'spring', 'breakfast', 75, 0, 1, '软糯香甜'),
('rec-f21', 'r006', '25-36', 'spring', 'breakfast', 74, 0, 2, '嫩滑布丁蒸蛋'),
('rec-f22', 'r108', '25-36', 'spring', 'lunch', 73, 0, 3, '豆腐蔬菜羹'),
('rec-f23', 'r104', '25-36', 'spring', 'lunch', 70, 0, 4, '土豆牛肉焖饭'),
('rec-f24', 'r201', '25-36', 'spring', 'dinner', 69, 0, 5, '鸡肉小馄饨'),
('rec-f25', 'r208', '25-36', 'spring', 'dinner', 68, 0, 6, '蛋饺造型可爱');
