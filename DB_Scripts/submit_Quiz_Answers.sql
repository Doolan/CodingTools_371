USE [CodingToolsDev]
IF OBJECT_ID('[dbo].[submit_Review]') IS not NULL
    DROP PROCEDURE [dbo].submit_Review
GO

CREATE PROCEDURE submit_Quiz_Answers
(
	@UserId int,
	@ToolId int,
	@Title NVARCHAR(MAX),
	@Rating int,
	@Description NVARCHAR(140) = NULL
 )
 AS
 SET NOCOUNT ON

IF((SELECT COUNT(UserId) FROM [Users] WHERE UserID = @UserID) = 0)
BEGIN
	PRINT 'The UserId ' + CONVERT(VARCHAR(30), @UserId) + ' is not contained in the database '
	RETURN 1	
END

IF((SELECT COUNT(ToolId) FROM Tools WHERE ToolId = @ToolId) = 0)
BEGIN
	PRINT 'The ToolId ' + CONVERT(VARCHAR(30), @ToolId) + ' is not contained in the database '
	RETURN 1	
END

INSERT INTO [Reviews] (Rating, Content, ToolId, CreatorId, Title)
VALUES (@Rating, @Description, @ToolId, @UserId, @Title)

SELECT @@IDENTITY AS 'Identity'

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
GO