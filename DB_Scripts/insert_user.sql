IF OBJECT_ID('insert_user', 'P') IS NOT NULL
DROP PROCEDURE insert_user
GO

CREATE PROCEDURE [insert_user]
	@Name nvarchar(255),
	@Email nvarchar(255),
	@Title nvarchar(255),
	@Username nvarchar(30),
	@PasswordHash binary(64),
	@PasswordSalt binary(64)

AS

INSERT INTO [Users]
([Name], [Email], [Title], [Username], [PasswordHash], [PasswordSalt])
VALUES (@Name, @Email, @Title, @Username, @Passwordhash, @PasswordSalt)

SELECT @@IDENTITY AS 'Identity';

RETURN SELECT id FROM [identity]