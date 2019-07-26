/*
Navicat MySQL Data Transfer

Source Server         : node测试
Source Server Version : 80016
Source Host           : localhost:3306
Source Database       : cpts

Target Server Type    : MYSQL
Target Server Version : 80016
File Encoding         : 65001

Date: 2019-07-25 14:43:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article_table
-- ----------------------------
DROP TABLE IF EXISTS `article_table`;
CREATE TABLE `article_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL,
  `catalog_ID` int(11) NOT NULL,
  `created_time` int(11) NOT NULL,
  `author` varchar(32) NOT NULL,
  `view` int(11) NOT NULL,
  `comment` int(11) NOT NULL,
  `summary` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `list_img_src` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `banner_img_src` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_table
-- ----------------------------
INSERT INTO `article_table` VALUES ('1', '如何看待杭州小伙单车逆行被抓，接电话后崩溃爆哭？', '4', '1564272000', 'yj', '10', '666', '如何看待杭州小伙单车逆行被抓，接电话后崩溃爆哭？', '小伙从挂断电话开始崩溃，\r\n全程依次经历了，\r\n扔手机，\r\n捡手机，\r\n哭喊，\r\n掏身份证钱包给交警，\r\n跑向桥边意欲轻生，\r\n被交警拦下，\r\n蹲坐在路边哭泣。\r\n从崩溃到产生轻声念头到付诸行动的那段时间里，他没有骂过一句脏话，全程只有“对不起”“谢谢你”“我也不想这样”“我压力好大”“我只是想发泄一下”“谢谢你们”“对不起”出现频率最高的词就是“谢谢”和“对不起”一个压抑至死都害怕麻烦别人的他，像极了无数个懂事到连哭都要在无人的夜晚里捂住嘴巴怕人听见的你我。\r\n', 'upload_e1a6b1fad5184cff5292544d4b816bb2', 'upload_4da0a8bb676457615bb172c8150aa075');
INSERT INTO `article_table` VALUES ('2', '啦啦啦啦', '1', '1563235200', '哈哈哈哈', '45', '3', '发到付打开脚后跟', '虽然当时没有记下来，不过现在想到还是觉得挺高的。去年10月20日，s8八强淘汰赛，RNG2:3输给G2，7点钟打完的，10点钟知乎热榜第一，到半夜1个亿的热度没记错的话这一战在知乎的热度甚至高于IG夺冠，造了无数梗，养活大批自媒体。在热榜挂了几天，然后被人鞭尸（?）几个月。如果单从游戏区来讲，这应该是最高的了<img src=\"https://pic3.zhimg.com/50/v2-481ebb5134f85312df43b538fd00cc36_hd.jpg\" data-rawwidth=\"88\" data-rawheight=\"89\" data-size=\"normal\" class=\"content_image\" width=\"88\"/>\r\n\r\n作者：半盏浮生半盏可乐\r\n链接：https://www.zhihu.com/question/292939358/answer/761302305\r\n来源：知乎\r\n著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。', 'upload_65c15295e52917dfdaf27ae92882fea1', 'upload_17be56566b6ef460916342a36c8dc9ca');

-- ----------------------------
-- Table structure for banner_table
-- ----------------------------
DROP TABLE IF EXISTS `banner_table`;
CREATE TABLE `banner_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `src` varchar(64) NOT NULL,
  `href` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `serial` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner_table
-- ----------------------------
INSERT INTO `banner_table` VALUES ('6', '啦啦啦啦', 'upload_8f50b37ea34b31e7156998a889f8766e', 'https://www.douyu.com/g_LOL', '33');
INSERT INTO `banner_table` VALUES ('9', '笑你个头啦啦啦', 'upload_01aa7e2375af05504b0c83b4a3c335eb', 'https://www.douyu.com/g_LOL', '15');
INSERT INTO `banner_table` VALUES ('17', '他他他', 'upload_d473c85619ae86ca684fdbf99ebd4a87', 'https://www.baidu.com/', '6');
INSERT INTO `banner_table` VALUES ('13', '略略略嘻嘻嘻', 'upload_626b860bccf10184698a2a930939c7e4', 'https://www.baidu.com/', '57');
INSERT INTO `banner_table` VALUES ('12', '菜就菜了怎么了', 'upload_266557d69a1a10e101f4027dbf436275', 'https://www.douyu.com/g_LOL', '99');

-- ----------------------------
-- Table structure for catalog_table
-- ----------------------------
DROP TABLE IF EXISTS `catalog_table`;
CREATE TABLE `catalog_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of catalog_table
-- ----------------------------
INSERT INTO `catalog_table` VALUES ('1', '数码');
INSERT INTO `catalog_table` VALUES ('2', '衣服啦');
INSERT INTO `catalog_table` VALUES ('4', '咋滴');
INSERT INTO `catalog_table` VALUES ('5', '嘟嘟嘟');
INSERT INTO `catalog_table` VALUES ('7', '哈哈哈哈');

-- ----------------------------
-- Table structure for comment_table
-- ----------------------------
DROP TABLE IF EXISTS `comment_table`;
CREATE TABLE `comment_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `article_ID` int(11) NOT NULL,
  `nickname` varchar(32) NOT NULL,
  `url` varchar(255) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment_table
-- ----------------------------
