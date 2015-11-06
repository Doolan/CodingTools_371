USE [codingtoolsdev]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('[dbo].[get_Tool_Page]') IS not NULL
    DROP PROCEDURE [dbo].[get_Tool_Page]
GO

CREATE PROCEDURE [dbo].[get_Tool_Page]
(@ToolId INT)
 AS
 SET NOCOUNT ON

IF(SELECT COUNT(ToolId) FROM Tools WHERE ToolId = @ToolId)= 0
BEGIN
	PRINT 'The ToolId ' + CONVERT(VARCHAR(30), @ToolId) + ' does not exist'
	RETURN 1	
END

SELECT  ToolId, Name, URL, [Description], ImgPath,
		TagName, TagValue, TagId, TagCategoryId
		FROM Tool_View
		WHERE ToolId = @ToolId
		ORDER BY Name ASC, TagCategoryId ASC, TagId ASC


DECLARE @Status SMALLINT
SET @Status = @@ERROR
IF @Status <> 0 
	BEGIN
	-- Return error code to the calling program to indicate failure. 
	PRINT 'An error occurred'
	RETURN(@Status)
END
ELSE 
	BEGIN
	RETURN 0
END
