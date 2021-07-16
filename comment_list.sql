/*
 Navicat Premium Data Transfer

 Source Server         : web13
 Source Server Type    : MySQL
 Source Server Version : 100511
 Source Host           : localhost:3306
 Source Schema         : comment_list

 Target Server Type    : MySQL
 Target Server Version : 100511
 File Encoding         : 65001

 Date: 16/07/2021 16:55:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment_list
-- ----------------------------
DROP TABLE IF EXISTS `comment_list`;
CREATE TABLE `comment_list`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 47 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment_list
-- ----------------------------
INSERT INTO `comment_list` VALUES (19, 'tom', 'I\'m TOM');
INSERT INTO `comment_list` VALUES (30, 'code', '666777');
INSERT INTO `comment_list` VALUES (33, '一寸长,一寸强', '一寸长,一寸强一寸长,一寸强一寸长,一寸强一寸长,一寸强一寸长,一寸强');
INSERT INTO `comment_list` VALUES (34, 'tom', 'tom');
INSERT INTO `comment_list` VALUES (35, 'jerry', 'I love tom');
INSERT INTO `comment_list` VALUES (36, 'hhr', 'Saturday');
INSERT INTO `comment_list` VALUES (37, 'code', 'boy');
INSERT INTO `comment_list` VALUES (38, 'ok', 'lalala');
INSERT INTO `comment_list` VALUES (41, 'tom', 'tom');
INSERT INTO `comment_list` VALUES (42, 'tom', 'tom');
INSERT INTO `comment_list` VALUES (43, '_', '_');
INSERT INTO `comment_list` VALUES (44, '+', '+');
INSERT INTO `comment_list` VALUES (45, '@', '@');
INSERT INTO `comment_list` VALUES (46, '[%</>%]', '[code]');

SET FOREIGN_KEY_CHECKS = 1;
