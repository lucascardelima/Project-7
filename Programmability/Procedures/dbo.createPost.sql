SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 24/09/2022
-- Description:	Create new post
-- =============================================
CREATE PROCEDURE [dbo].[createPost] 
	-- Add the parameters for the stored procedure here
	@postID nvarchar(37) = null, 
	@userID nvarchar(37) = null,
	@postTitle nvarchar(50) = null,
	@postCreationDate datetime = null,
	@postEditDate datetime = null,
	@postText nvarchar(MAX) = null,
	@postCategory nvarchar(10) = null,
	@imageUrl nvarchar(50) = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO Posts (postID, userID, postTitle, postCreationDate, postEditDate, postText, postCategory, imageUrl)
	VALUES (@postID, @userID, @postTitle, @postCreationDate, @postEditDate, @postText, @postCategory, @imageUrl)

	SELECT	postID

	FROM	Posts

	WHERE	postID = @postID

END
GO