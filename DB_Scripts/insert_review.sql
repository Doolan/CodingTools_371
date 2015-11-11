IF OBJECT_ID('insert_review', 'P') IS NOT NULL
DROP PROCEDURE insert_review
GO

CREATE PROCEDURE [insert_review]
	(@Rating decimal(9),
	@Content nvarchar(255),
	@ToolID int,
	@CreatorID int,
	@Title varchar(30))
AS

INSERT INTO [Reviews]
([Rating], [Content], [ToolID], [CreatorID], [Title])
VALUES (@Rating, @Content, @ToolID, @CreatorID, @Title)

RETURN 0