IF OBJECT_ID('add_User', 'P') IS NOT NULL
DROP PROCEDURE [dbo].add_User
GO

CREATE PROCEDURE [add_User]
	@Name_1 nvarchar,
	@Email_2 nvarchar,
	@Title_3 nvarchar,
	@Username_4 nvarchar,
AS

INSERT INTO [Users]
([Name], [Email], [Title], [Username])
VALUES (@Name_1, @Email_2, @Title_3, @Username_4)

RETURN 0
