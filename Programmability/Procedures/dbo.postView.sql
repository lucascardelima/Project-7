SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 28/11/2022
-- Description:	Store the userIDs that viewed a specific post
-- =============================================
CREATE PROCEDURE [dbo].[postView] 
	-- Add the parameters for the stored procedure here
	@postID nvarchar(37) = null,
	@userID nvarchar(37) = null,
	@viewID nvarchar(37) = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO		PostViews	(postID, userID, viewID)
	VALUES						(@postID, @userID, @viewID)

	SELECT	userID

	FROM	PostViews

	WHERE	postID = @postID
END
GO