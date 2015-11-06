CREATE VIEW Tool_View
AS
SELECT t.ToolID, t.Name, t.URL, t.[Description], t.ImgPath,
		tag.Name AS TagName, tag.Value AS TagValue, tc.Name AS CategoryName, tag.TagId, tag.TagCategoryId
FROM TOOLS t
LEFT JOIN ToolTags ttags
	ON ttags.ToolId = t.ToolId
LEFT JOIN Tags tag 
	ON tag.TagId = ttags.TagId
LEFT JOIN TagCategories tc 
	ON tc.TagCategoryId = tag.TagCategoryId
--ORDER BY t.Name ASC, tag.TagCategoryId ASC, tag.TagId ASC

--DROP VIEW TOOL_VIEW