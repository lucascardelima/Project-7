SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 05/10/2022
-- Description:	Get posts based on category
-- =============================================
CREATE PROCEDURE [dbo].[getPosts] 
	-- Add the parameters for the stored procedure here
	@postCategory varchar(37) = null,
	@userID varchar(MAX) = null

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here 
	SELECT		a.userID,
				a.postTitle,
				a.postCreationDate,
				a.postText,
				a.postCategory,
				a.imageUrl,
				a.postID,
				b.firstName,
				b.lastName,
				b.profileImage

	FROM		Posts a

	LEFT JOIN	Users b

	ON			a.userID = b.userID

	WHERE		a.postCategory IN (SELECT convert(char, value) from string_split(@postCategory, ','))
	OR			a.userID = @userID

END
GO