//=============================================================================
// VisuStella MZ - Dragonbones Union
// VisuMZ_2_DragonbonesUnion.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_DragonbonesUnion = true;

var VisuMZ = VisuMZ || {};
VisuMZ.DragonbonesUnion = VisuMZ.DragonbonesUnion || {};
VisuMZ.DragonbonesUnion.version = 1.25;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.25] [DragonbonesUnion]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Dragonbones_Union_VisuStella_MZ
 * @base Public_0_Dragonbones
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter Public_0_Dragonbones
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * DragonBones allows your games to use skeletal animation, a type of computer
 * animation in which a character (or object) is represented by skins/textures
 * and a digital set of interconnected bones (called the skeleton). Using a set
 * of instructions, the game will create animations based off these skins,
 * skeletons, and instructions to create beautifully smooth and light-weight
 * movements.
 *
 * This plugin gives you such control over various facets of your game: the
 * battle system, event pictures, and map sprites for characters. Various
 * plugin commands, notetags, and comment tags are added through this plugin to
 * give you as much control as you need over Dragonbones from the RPG Maker MZ
 * editor itself.
 *
 * The version of Dragonbones used for this plugin is 5.7.002b.
 * More information can be found at http://dragonbones.com/
 *
 * Features include all (but not limited to) the following:
 * 
 * - Adds Dragonbones support to RPG Maker MZ.
 * - Dragonbones armatures can be used as battler sprites.
 * - Dragonbones armatures can be attached to event pictures.
 * - Dragonbones armatures can be inserted into the map as character sprites.
 * - A variety of Plugin Parameters, Notetags, and Plugin Commands to control
 *   the Dragonbones armatures and their animations.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - Dragonbones*
 *
 * *Note* You can download this library from the below URL or from the
 * Dragonbones Union product page. Install it as a Tier 0 plugin.
 *
 * URL: https://www.npmjs.com/package/pixi5-dragonbones/v/5.7.0-2b
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Dragonbones Naming
 * ============================================================================
 *
 * If you are trying to set up a Dragonbones armature through notetags, Plugin
 * Commands, etc., and are getting the error message "Cannot Read property
 * 'parent' of null", then most likely, the incorrect Dragonbones armature name
 * is being used.
 *
 * ---
 * 
 * To find the Proper Name:
 * 
 * 1. Open up the Dragonbones armature in the Dragonbones editor.
 * 
 * ---
 * 
 * 2. Open the armature's Properties.
 * 
 * ---
 * 
 * 3. Look at what the "Name:" field lists. This is the name to use with the
 *    Dragonbones Union plugin.
 * 
 * ---
 *
 * ============================================================================
 * Dragonbones Armature Behaviors
 * ============================================================================
 *
 * Dragonbones armatures have certain behaviors when used with battlers,
 * pictures, and/or map sprites.
 *
 * ---
 *
 * 1. When a Dragonbones armature is loaded, it will play the 'idle' animation
 *    or whatever is set inside the Plugin Parameters => General Settings =>
 *    Loaded Animation field upon loading. Make your Dragonbones armatures with
 *    this in mind. At other times, the 'idle' animation will be used as a base
 *    defaulting animation.
 *
 * ---
 *
 * 2. The Dragonbones armature will always be anchored at the X, Y coordinates
 *    of the target. This X, Y coordinate point will be where the root/pivot
 *    point of the Dragonbones armature will be located.
 *
 * ---
 *
 * 3. The properties used by a sprite (ie the opacity, scale, rotation, and
 *    tint) will also be shared and/or amplified with the Dragonbones armature.
 *    The exception to this will be Blend Modes aren't supported.
 *
 * ---
 *
 * ============================================================================
 * IMPORTANT!! Dragonbones Armatures as Map Sprites
 * ============================================================================
 *
 * If you plan on using Dragonbones armatures as map sprites, please keep in
 * mind that there will be certain limitations and properties regarding them,
 * which will be listed below:
 *
 * ---
 *
 * 1. Try not to use more than 99 vertices for meshes. The reason behind this
 *    is because the Dragonbones armature is added as a sprite to the game's
 *    Tilemap. Any and all sprites added to the Tilemap have some restrictions
 *    placed on them as per Pixi JS's design. The Dragonbones armatures are no
 *    exception to this.
 *
 *    If the number of vertices exceeds 99, strange things will occur to the
 *    Dragonbones armature that are outside of this plugin's control. While it
 *    won't stop the plugin from functioning properly, expected behaviors may
 *    happen due to the threshold.
 *
 * ---
 *
 * 2. When using Dragonbones armatures that are too tall or wide, they may clip
 *    into the tile layer above or to the side due to how the Tilemap works.
 *    Things that you would see happen would include clipping into the tops of
 *    trees and structures.
 *
 * ---
 *
 * 3. Certain motions will request specific animations from the Dragonbones
 *    armature. If the animations exist, it will play those motions. If they
 *    don't, the motions may request a different animation down the line. The
 *    request orders are as follows:
 *
 *    Jumping:
 *    - jump, walk, idle
 *
 *    Rope (Climbing) (Requires: VisuMZ_1_EventsMoveCore):
 *    - ropeclimb, ladderclimb, walk, ropeidle, ladderidle, idle
 *
 *    Rope (Idle) (Requires: VisuMZ_1_EventsMoveCore):
 *    - ropeidle, ladderidle, idle
 *
 *    Ladder (Climbing):
 *    - ladderclimb, walk, ladderidle, idle
 *
 *    Ladder (Idle):
 *    - ladderidle, idle
 *
 *    Dashing:
 *    - dash, walk, idle
 *
 *    Walking:
 *    - walk, idle
 *
 *    Idle:
 *    - idle
 *
 *    Name the animations for the Dragonbones armature as such to make the most
 *    out of the motion priority lists.
 *
 * ---
 *
 * 4. You can add directional animations for your Dragonbones armature motion
 *    animations. To do so, add a number after the animation's name like such:
 *    walk2, walk4, walk6, walk8. These numbers are based off the NumPad
 *    directions to determine which way to face:
 *
 *    7 8 9
 *    4   6
 *    1 2 3
 *
 *    These numbers are added onto the priority system listed in #3 above, too.
 *    Diagonal directions also become split and added multiple times for better
 *    streamlining, with a priority given to the horizontal direction before
 *    the vertical direction. For example, dashing becomes the following:
 *
 *    Dashing (Upper Left):
 *    - dash7, dash4, dash8, dash,
 *      walk7, walk4, walk8, walk,
 *      idle7, idle4, idle8, idle
 *
 *    Dashing (Right):
 *    - dash6, dash,
 *      walk6, walk,
 *      idle6, idle
 *
 * ---
 *
 * 5. When a Dragonbones armature is moving, it will animate slower or faster
 *    depending on the character's current movement speed. At speed
 *    '4: Normal', it will animation 4x faster than what's seen in Dragonbones.
 *    At speed '6: x4 Faster', it will animate 6x faster while '1: x8 Slower'
 *    will be at x1 speed seen in Dragonbones. In other words, the speed
 *    animated is equal to the number written on the left of the
 *    movement speed.
 *
 *    When dashing, that multiplier increases by 1 in order to match movement
 *    speeds and the Dragonbones armature will do the same to follow.
 *
 * ---
 *
 * You will need to create your Dragonbones armatures with these 5 key rules in
 * mind in order to make the armatures animate smoothly within your game.
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 *
 * VisuMZ_3_StateTooltips
 *
 * If you are using a Dragonbones Battler and want to apply a state tooltip to
 * it, the access area of the battler will be based on the hitbox size you
 * declare for the Dragonbones Battler with notetags. This is because all
 * Dragonbones battlers do not have innate automatically calculated hitbox
 * sizes as a result of their dynamically animated nature.
 * 
 * Please refer to the notetag section of the Dragonbones Union plugin for
 * Dragonbones Battler hitboxes to learn how to apply hitbox sizes.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * === Dragonbones Battler Notetags ===
 *
 * The following notetags are to be assigned to either actors and/or enemies.
 * An assigned actor/enemy will have their original sprite hidden from view in
 * favor of the Dragonbones armature to be displayed. Use these notetags to
 * declare various settings for your Dragonbones armatures.
 *
 * ---
 *
 * <Dragonbones Battler: filename>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the DragonBones associated with this actor/enemy to be 'filename'.
 * - The name will be associated with the assets used.
 * - It will be used to check for associated filenames that end with _ske.json,
 *   _tex.json, and _tex.png.
 * - The listed assets must be found in the assigned assets folder.
 *
 * Examples:
 *
 * <Dragonbones Battler: Demon>
 * <Dragonbones Battler: DragonBoy>
 * <Dragonbones Battler: Swordsman>
 * <Dragonbones Battler: Ubbie>
 *
 * ---
 *
 * <Dragonbones Battler Scale: x, y>
 *
 * <Dragonbones Battler Scale X: x>
 * <Dragonbones Battler Scale Y: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the base scale for the Dragonbones associated with this actor/enemy.
 *   This is for those instances where a Dragonbones armature is too large or
 *   small and needs to be scaled down/up.
 * - This scale will be amplified by the actor/enemy's sprite's scale value.
 * - Use the 1st notetag to assign values to both Scale X and Scale Y.
 * - Use the 2nd/3rd notetags to assign Scale X and Y values separately.
 * - Use negative values to flip the Dragonbones armature around.
 *
 * Examples:
 * 
 * <Dragonbones Battler Scale: -0.3, 0.3>
 *
 * <Dragonbones Battler Scale X: -0.3>
 * <Dragonbones Battler Scale Y: 0.3>
 *
 * ---
 *
 * <Dragonbones Battler Offset: x, y>
 *
 * <Dragonbones Battler Offset X: x>
 * <Dragonbones Battler Offset Y: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - When a Dragonbones armature is attached to an actor/enemy's sprite, it
 *   will always be attached at the root point assigned within the Dragonbones
 *   data. If a Dragonbones armature has a root point that does not fit well
 *   with your battler sprite, you can offset it using these notetags.
 * - Replace 'x' and 'y' with number values representing how many pixels you
 *   want to offset the Dragonbones armature by.
 * - Use the 1st notetag to assign values to both Offset X and Offset Y.
 * - Use the 2nd/3rd notetags to assign Offset X and Y values separately.
 * - Use negative values to offset to the left (X) or up (Y) directions.
 *
 * Examples:
 *
 * <Dragonbones Battler Offset: -10, 5>
 *
 * <Dragonbones Battler Offset X: -10>
 * <Dragonbones Battler Offset Y: 5>
 *
 * ---
 *
 * <Dragonbones Battler Size: width, height>
 *
 * <Dragonbones Battler Width: x>
 * <Dragonbones Battler Height: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Dragonbones armatures have no standard width or height. This makes it
 *   problematic when trying to calculate the sprite's width/height for Action
 *   Sequences and the like. These notetags allow you to assign a width and
 *   height value to the sprite, despite the fact the Dragonbones armatures
 *   have no such thing.
 * - Replace 'width', 'height', or 'x' with number values representing the
 *   dimension values in pixels.
 * - Use the 1st notetag to assign values to both Width and Height.
 * - Use the 2nd/3rd notetags to assign Width and Height values separately.
 * - If these notetags aren't used, then use the values defined by default in
 *   Plugin Parameters => Battler Settings => Default => Width/Height.
 *
 * Examples:
 *
 * <Dragonbones Battler Size: 50, 100>
 *
 * <Dragonbones Battler Width: 50>
 * <Dragonbones Battler Height: 100>
 *
 * ---
 *
 * <Dragonbones Battler Time Scale: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Lets you adjust the time scale for the Dragonbones armature.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 *
 * Example:
 *
 * <Dragonbones Battler Time Scale: 1.5>
 *
 * ---
 *
 * <Dragonbones Battler Motion Walk: animation>
 * <Dragonbones Battler Motion Wait: animation>
 * <Dragonbones Battler Motion Chant: animation>
 * <Dragonbones Battler Motion Guard: animation>
 * <Dragonbones Battler Motion Damage: animation>
 * <Dragonbones Battler Motion Evade: animation>
 * <Dragonbones Battler Motion Thrust: animation>
 * <Dragonbones Battler Motion Swing: animation>
 * <Dragonbones Battler Motion Missile: animation>
 * <Dragonbones Battler Motion Skill: animation>
 * <Dragonbones Battler Motion Spell: animation>
 * <Dragonbones Battler Motion Item: animation>
 * <Dragonbones Battler Motion Escape: animation>
 * <Dragonbones Battler Motion Victory: animation>
 * <Dragonbones Battler Motion Dying: animation>
 * <Dragonbones Battler Motion Abnormal: animation>
 * <Dragonbones Battler Motion Sleep: animation>
 * <Dragonbones Battler Motion Dead: animation>
 *
 * - Used for: Actor, Enemy Notetags
 * - Use these notetags to assign Dragonbones animations to play when the
 *   actor/enemy sprite is supposed to play such a motion.
 * - Replace 'animation' with the name of the Dragonbones animation.
 * - If this notetag is not used, when such a motion is rquested, it will
 *   default to attempting to play the animation name equal to the motion.
 * - Animation names do not need to be case sensitive.
 * - If no animation is found, then no animation will be played.
 *
 * Examples:
 *
 * <Dragonbones Battler Motion Wait: idle>
 * <Dragonbones Battler Motion Swing: attack>
 * <Dragonbones Battler Motion Thrust: attack>
 * <Dragonbones Battler Motion Missle: attack>
 * <Dragonbones Battler Motion Skill: special>
 * <Dragonbones Battler Motion Spell: special>
 * <Dragonbones Battler Motion Dead: defeated>
 *
 * ---
 *
 * <Dragonbones Battler Settings>
 *  Battler: filename
 *  
 *  Scale: x, y
 *
 *  Scale X: x
 *  Scale Y: x
 *
 *  Offset: x, y
 *
 *  Offset X: x
 *  Offset Y: x
 *
 *  Size: width, height
 *
 *  Width: x
 *  Height: x
 *
 *  Time Scale: x
 *
 *  Motion Walk: animation
 *  Motion Wait: animation
 *  Motion Chant: animation
 *  Motion Guard: animation
 *  Motion Damage: animation
 *  Motion Evade: animation
 *  Motion Thrust: animation
 *  Motion Swing: animation
 *  Motion Missile: animation
 *  Motion Skill: animation
 *  Motion Spell: animation
 *  Motion Item: animation
 *  Motion Escape: animation
 *  Motion Victory: animation
 *  Motion Dying: animation
 *  Motion Abnormal: animation
 *  Motion Sleep: animation
 *  Motion Dead: animation
 * </Dragonbones Battler Settings>
 *
 * - Used for: Actor, Enemy Notetags
 * - The above notetag allows to wrap up all the information you'd like to
 *   set for Dragonbones battler armatures needed inside a single notetag
 *   container.
 * - The settings are the same as the notetags listed above it.
 * - You may remove the settings you don't wish to change.
 * - The only necessary data is the 'Battler: filename' line.
 *
 * Example:
 *
 * <Dragonbones Battler Settings>
 *  Battler: Demon
 *  
 *  Scale: 0.3, 0.3
 *
 *  Size: 80, 80
 *
 *  Motion Wait: idle
 *  Motion Damage: hit
 *  Motion Swing: attack
 *  Motion Thrust: attack
 *  Motion Missile: attack
 *  Motion Skill: special
 *  Motion spell: special
 *  Motion Dead: defeated
 * </Dragonbones Battler Settings>
 *
 * ---
 * 
 * <Dragonbones Hue Affected>
 * 
 * - Used for: Enemy Notetags
 * - The above notetag enables hues to affect enemy battlers.
 * - This will bypass the Plugin Parameter default settings.
 * 
 * ---
 * 
 * <Dragonbones No Hue>
 * 
 * - Used for: Enemy Notetags
 * - The above notetag disables hues to affect enemy battlers.
 * - This will bypass the Plugin Parameter default settings.
 * 
 * ---
 *
 * === Dragonbones Map Sprite Notetags & Comment Tags ===
 *
 * You can also use Dragonbones armatures as map sprites. When used, any of the
 * original sprites before will become invisible and will be replaced with the
 * Dragonbones armature.
 *
 * These notetags can be used for actors and events. In the case of events,
 * both notetags and comment tags can be used to determine what settings to use
 * for the Dragonbones armatures.
 *
 * Be cautious when using Comment Tags for event pages since comments contain a
 * maximum line count of 6.
 *
 * ---
 *
 * <Dragonbones Sprite: filename>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Sets the DragonBones associated with this map sprite to be 'filename'.
 * - The name will be associated with the assets used.
 * - It will be used to check for associated filenames that end with _ske.json,
 *   _tex.json, and _tex.png.
 * - The listed assets must be found in the assigned assets folder.
 *
 * Examples:
 *
 * <Dragonbones Sprite: Demon>
 * <Dragonbones Sprite: DragonBoy>
 * <Dragonbones Sprite: Swordsman>
 * <Dragonbones Sprite: Ubbie>
 *
 * ---
 *
 * <Dragonbones Sprite Scale: x, y>
 *
 * <Dragonbones Sprite Scale X: x>
 * <Dragonbones Sprite Scale Y: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Sets the base scale for the Dragonbones associated with this map sprite.
 *   This is for those instances where a Dragonbones armature is too large or
 *   small and needs to be scaled down/up.
 * - This scale will be amplified by the character's sprite's scale value.
 * - Use the 1st notetag to assign values to both Scale X and Scale Y.
 * - Use the 2nd/3rd notetags to assign Scale X and Y values separately.
 * - Use negative values to flip the Dragonbones armature around.
 *
 * Examples:
 * 
 * <Dragonbones Sprite Scale: -0.3, 0.3>
 *
 * <Dragonbones Sprite Scale X: -0.3>
 * <Dragonbones Sprite Scale Y: 0.3>
 *
 * ---
 *
 * <Dragonbones Sprite Offset: x, y>
 *
 * <Dragonbones Sprite Offset X: x>
 * <Dragonbones Sprite Offset Y: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - When a Dragonbones armature is attached to an character's map sprite, it
 *   will always be attached at the root point assigned within the Dragonbones
 *   data. If a Dragonbones armature has a root point that does not fit well
 *   with your battler sprite, you can offset it using these notetags.
 * - Replace 'x' and 'y' with number values representing how many pixels you
 *   want to offset the Dragonbones armature by.
 * - Use the 1st notetag to assign values to both Offset X and Offset Y.
 * - Use the 2nd/3rd notetags to assign Offset X and Y values separately.
 * - Use negative values to offset to the left (X) or up (Y) directions.
 *
 * Examples:
 *
 * <Dragonbones Sprite Offset: -10, 5>
 *
 * <Dragonbones Sprite Offset X: -10>
 * <Dragonbones Sprite Offset Y: 5>
 *
 * ---
 *
 * <Dragonbones Sprite Time Scale: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the time scale for the Dragonbones armature.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 *
 * Example:
 *
 * <Dragonbones Sprite Time Scale: 1.5>
 *
 * ---
 * 
 * <Dragonbones Sprite Walk Rate: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the animation speed for the Dragonbones armature only
 *   when it is walking.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 * - If used with the <Dragonbones Sprite Time Scale: x>, the speed will stack
 *   multiplicatively.
 *
 * Example:
 *
 * <Dragonbones Sprite Walk Rate: 1.5>
 * 
 * ---
 * 
 * <Dragonbones Sprite Dash Rate: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the animation speed for the Dragonbones armature only
 *   when it is dashing.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 * - If used with the <Dragonbones Sprite Time Scale: x>, the speed will stack
 *   multiplicatively.
 *
 * Example:
 *
 * <Dragonbones Sprite Dash Rate: 1.5>
 * 
 * ---
 *
 * <Dragonbones Sprite Size: width, height>
 *
 * <Dragonbones Sprite Width: x>
 * <Dragonbones Sprite Height: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Dragonbones armatures have no standard width or height. This makes it
 *   problematic when trying to calculate the sprite's width/height for various
 *   plugins that use it. These notetags allow you to assign a width and
 *   height value to the sprite, despite the fact the Dragonbones armatures
 *   have no such thing.
 * - Replace 'width', 'height', or 'x' with number values representing the
 *   dimension values in pixels.
 * - Use the 1st notetag to assign values to both Width and Height.
 * - Use the 2nd/3rd notetags to assign Width and Height values separately.
 * - If these notetags aren't used, then use the values defined by default in
 *   the Plugin Parameters.
 *
 * Examples:
 *
 * <Dragonbones Sprite Size: 48, 64>
 *
 * <Dragonbones Sprite Width: 48>
 * <Dragonbones Sprite Height: 64>
 *
 * ---
 *
 * <Dragonbones Sprite Flip Left>
 * <Dragonbones Sprite Flip Right>
 *
 * <Dragonbones Sprite No Flip Left>
 * <Dragonbones Sprite No Flip Right>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets the map sprite know to flip itself when facing either the left/right
 *   directions in order to reuse animations.
 * - The 'No' variants will prevent flipping from occuring.
 * - These notetags will override settings applied in the Plugin Parameters.
 *
 * ---
 *
 * <Dragonbones Sprite Motion Idle: animation>
 * <Dragonbones Sprite Motion Walk: animation>
 * <Dragonbones Sprite Motion Dash: animation>
 * <Dragonbones Sprite Motion Jump: animation>
 * <Dragonbones Sprite Motion LadderIdle: animation>
 * <Dragonbones Sprite Motion LadderClimb: animation>
 * <Dragonbones Sprite Motion RopeIdle: animation>
 * <Dragonbones Sprite Motion RopeClimb: animation>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you set specific animations different from the ones listed in the
 *   Plugin Parameters for specific motions.
 * - Replace 'animation' with the name of the Dragonbones animation.
 * - If this notetag is not used, when such a motion is rquested, it will
 *   default to attempting to play the animation name equal to the motion.
 * - Animation names do not need to be case sensitive.
 * - If no animation is found, then no animation will be played.
 *
 * Example:
 *
 * <Dragonbones Sprite Motion Idle: stand>
 * <Dragonbones Sprite Motion Walk: move>
 * <Dragonbones Sprite Motion Dash: run>
 * <Dragonbones Sprite Motion Jump: hop>
 *
 * ---
 *
 * <Dragonbones Sprite Settings>
 *  Filename: filename
 *
 *  Scale: x, y
 *
 *  Scale X: x
 *  Scale Y: x
 *
 *  Offset: x, y
 *
 *  Offset X: x
 *  Offset Y: x
 *
 *  Time Scale: x
 * 
 *  Walk Rate: x
 *  Dash Rate: x
 *
 *  Width: x
 *  Height: x
 *
 *  Flip Left
 *  Flip Right
 *
 *  No Flip Left
 *  No Flip Right
 *
 *  Motion Idle: animation
 *  Motion Walk: animation
 *  Motion Dash: animation
 *  Motion Jump: animation
 *  Motion LadderIdle: animation
 *  Motion LadderClimb: animation
 *  Motion RopeIdle: animation
 *  Motion RopeClimb: animation
 * </Dragonbones Sprite Settings>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - The above notetag allows to wrap up all the information you'd like to
 *   set for Dragonbones battler armatures needed inside a single notetag
 *   container.
 * - The settings are the same as the notetags listed above it.
 * - You may remove the settings you don't wish to change.
 * - The only necessary data is the 'Filename: filename' line.
 *
 * Example:
 *
 * <Dragonbones Sprite Settings>
 *  Filename: Ubbie
 *
 *  Scale: 0.1, 0.1
 *
 *  Flip Right
 *
 *  Motion Idle: stand
 *  Motion Walk: walk
 * </Dragonbones Sprite Settings>
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Battler Plugin Commands ===
 * 
 * ---
 *
 * Battler: Actor Change Settings
 * - Change target actor's Dragonbones armature settings for battle.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *     Filename:
 *     - Change the armature's filename.
 *
 *     Offset X:
 *     - Change the armature's Offset X value.
 *
 *     Offset Y:
 *     - Change the armature's Offset Y value.
 *
 *     Scale X:
 *     - Change the armature's Scale X value.
 * 
 *     Scale Y:
 *     - Change the armature's Scale Y value.
 *
 *     Time Scale:
 *     - Change the armature's Time Scale value.
 *
 *     Width:
 *     - Change the battler width size.
 *
 *     Height:
 *     - Change the battler height size.
 *
 *   Motion Settings:
 *
 *     Walk:
 *     Wait:
 *     Chant:
 *     Guard:
 *     Damage:
 *     Evade:
 *     Thrust:
 *     Swing:
 *     Missile:
 *     Skill:
 *     Spell:
 *     Item:
 *     Escape:
 *     Victory:
 *     Dying:
 *     Abnormal:
 *     Sleep:
 *     Dead:
 *     - Change the animation used for this motion.
 *
 * ---
 * 
 * === Map Sprite Plugin Commands ===
 * 
 * ---
 *
 * Map Sprite: Actor Change Settings
 * - Change target actor's Dragonbones armature settings for map sprites.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *     Filename:
 *     - Change the armature's filename.
 *
 *     Offset X:
 *     - Change the armature's Offset X value.
 *
 *     Offset Y:
 *     - Change the armature's Offset Y value.
 *
 *     Scale X:
 *     - Change the armature's Scale X value.
 * 
 *     Scale Y:
 *     - Change the armature's Scale Y value.
 *
 *     Time Scale:
 *     - Change the armature's Time Scale value.
 * 
 *       Walk Rate:
 *       - Change the armature's walk animation rate.
 * 
 *       Dash Rate:
 *       - Change the armature's dash animation rate.
 *
 *     Width:
 *     - Change the battler width size.
 *
 *     Height:
 *     - Change the battler height size.
 *
 *   Flip Settings:
 *
 *     Flip Left?:
 *     Flip Right:
 *     - Flip the scale x value when facing left/right-ward directions?
 *
 *   Motion Settings:
 *
 *     Idle:
 *     Walk:
 *     Dash:
 *     Jump:
 *     Ladder (Idle):
 *     Ladder (Climb):
 *     Rope (Idle):
 *     Rope (Climb):
 *     - Base rope climbing animation name used.
 *
 * ---
 *
 * Map Sprite: Actor Play Animation
 * - Target actor plays a custom Dragonbones animation.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * NOTE: An alternative to this is to put the following code inside of a
 *       Movement Route's script call:
 *
 *       this.dragonbonesAnimation = "AnimationName";
 *
 *       Replace 'AnimationName' (keep the quotes) with the name of the
 *       Dragonbones animation.
 *
 * ---
 *
 * Map Sprite: Actor Stop Animation
 * - Stops a target actor's custom Dragonbones animation.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 * ---
 *
 * Map Sprite: Event Play Animation
 * - Target event plays a custom Dragonbones animation.
 *
 *   Event ID:
 *   - Select which Event ID to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Event Stop Animation
 * - Stops a target event's custom Dragonbones animation.
 *
 *   Event ID:
 *   - Select which Event ID to affect.
 *
 * ---
 *
 * Map Sprite: Follower Play Animation
 * - Target follower plays a custom Dragonbones animation.
 *
 *   Follower Index:
 *   - Select which Follower Index to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Follower Stop Animation
 * - Stops a target follower's custom Dragonbones animation.
 *
 *   Follower ID:
 *   - Select which Follower Index to affect.
 *
 * ---
 *
 * Map Sprite: Player Play Animation
 * - Player plays a custom Dragonbones animation.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Player Stop Animation
 * - Stops player's custom Dragonbones animation.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Dragonbones Setup
 * - Setup a Dragonbones armature for a picture.
 *
 *   Picture ID:
 *   - Select which Picture ID(s) to give a Dragonbones armature.
 *
 *   Armature Filename:
 *   - What is the armature's filename?
 *
 *   Play Animation:
 *   - Play this animation once it starts.
 *
 *   Offset: X:
 *   - Default X offset value for this Dragonbones armature.
 *
 *   Offset: Y:
 *   - Default Y offset value for this Dragonbones armature.
 *
 *   Scale: X:
 *   - Default X scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Scale: Y:
 *   - Default Y scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Time Scale:
 *   - Default time scale for this Dragonbones armature.
 *   - Higher values play faster. Lower values play slower.
 *
 * ---
 *
 * Picture: Play Dragonbones Animation
 * - Make an existing Dragonbones armature attached to a picture play
 *   an animation.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Play Animation:
 *   - Play this animation.
 * 
 *   Finish: Revert Idle:
 *   - Revert animation to 'idle' animation after finishing?
 *
 * ---
 *
 * Picture: Offset Dragonbones
 * - Offset the X, Y attachment point of the Dragonbones armature.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Offset: X:
 *   - X offset value for this Dragonbones armature.
 *
 *   Offset: Y:
 *   - Y offset value for this Dragonbones armature.
 *
 * ---
 *
 * Picture: Scale Dragonbones
 * - Change the scaling values of the Dragonbones armature.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Scale: X:
 *   - X scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Scale: Y:
 *   - Y scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 * ---
 *
 * Picture: Time Scale Dragonbones
 * - Change the speed at which Dragonbones animations play.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Time Scale:
 *   - Time scale for this Dragonbones armature.
 *   - Higher values play faster. Lower values play slower.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings that apply to all uses of Dragonbones through
 * this plugin. While the majority of these can remain unchanged, for those who
 * wish to customize the nature of the plugin to their liking can do so through
 * these Plugin Parameters.
 *
 * ---
 *
 * Assets Path
 * - The filepath to the directory that houses all the Dragonbone files.
 *
 * ---
 *
 * Defaults
 * 
 *   Loaded Animation:
 *   - The default animation to play once a Dragonbones armature is loaded.
 * 
 *   Looping Animations:
 *   - Force these animations to become looping animations even if they don't
 *     loop in Dragonbones.
 *
 * ---
 *
 * Skeletal Data
 * Texture Data
 * Texture Asset
 * 
 *   Key:
 *   - Key used to determine where needed data is stored.
 * 
 *   Extension:
 *   - Extension used to determine which files contain needed data.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battler Settings
 * ============================================================================
 *
 * Actor and Enemy sprites can have Dragonbones armatures attached to them as
 * sprites. Use these settings to make the Dragonbones armatures fit your needs
 * in battle.
 *
 * ---
 *
 * Default Settings
 * 
 *   Enemy Hue Affected?:
 *   - Affect hues for enemies with Dragonbones battlers?
 * 
 *   Offset: X:
 *   - Default X offset for battler sprites.
 * 
 *   Offset: Y:
 *   - Default Y offset for battler sprites.
 * 
 *   Scale: X:
 *   - Default scale for X used by Dragonbones battlers.
 * 
 *     Flip for Actors?:
 *     Flip for Enemies?:
 *     - Flip the scale x value into negative automatically for all actors
 *       or enemies?
 * 
 *   Scale: Y:
 *   - Default scale for Y used by Dragonbones battlers.
 * 
 *   Width:
 *   - Treat battler sprites as if they have this width.
 *   - Used for Action Sequences.
 * 
 *   Height:
 *   - Treat battler sprites as if they have this height.
 *   - Used for Action Sequences.
 *
 * ---
 * 
 * Idle Bypass
 * 
 *   List:
 *   - This is a list of animations that will not return back to the idle
 *     animation after completion.
 *   - Remove them if you want them to revert back to the idle animation
 *     after completion.
 *   - Add to the list if you want animations to stay in their final frame.
 * 
 * ---
 *
 * Default Motions
 * 
 *   Walk:
 *   Wait:
 *   Chant:
 *   Guard:
 *   Damage:
 *   Evade:
 *   Thrust:
 *   Swing:
 *   Missile:
 *   Skill:
 *   Spell:
 *   Item:
 *   Escape:
 *   Victory:
 *   Dying:
 *   Abnormal:
 *   Sleep:
 *   Dead:
 *   - Play this Dragonbones animation whenever this motion is requested
 *     by default.
 *   - Used for Action Sequences.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Map Sprite Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust the default configurations for any
 * map sprite that's using a Dragonbones armature. These settings can be
 * overwritten on per a sprite basis using notetags and comment tags, too.
 *
 * ---
 *
 * Defaults
 * 
 *   Offset: X:
 *   - Default X offset for map sprites.
 * 
 *   Offset: Y:
 *   - Default Y offset for map sprites.
 * 
 *   Scale: X:
 *   - Default scale for X used by Dragonbones map sprites.
 * 
 *     Flip Left?:
 *     Flip Right?:
 *     - Flip the scale x value when facing left/right-ward directions?
 * 
 *   Scale: Y:
 *   - Default scale for Y used by Dragonbones map sprites.
 * 
 *   Time Scale:
 *   - The rate at which animations play.
 *   - Higher numbers go faster.
 * 
 *   Width:
 *   - Treat map sprites as if they have this width.
 *   - Used for various plugins.
 * 
 *   Height:
 *   - Treat map sprites as if they have this height.
 *   - Used for various plugins.
 *
 * ---
 *
 * Motion Settings
 * 
 *   Idle:
 *   Walk:
 *   Dash:
 *   Jump:
 *   Ladder (Idle):
 *   Ladder (Climb):
 *   Rope (Idle):
 *   Rope (Climb):
 *   - Base walk animation name used.
 * 
 *   Walk Timer:
 *   - Number of frames to count as walking so that an idle animation isn't
 *     immediately forced upon stopping.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Experimental Settings
 * ============================================================================
 *
 * These settings are experimental and have not been tested extensively yet.
 *
 * ---
 *
 * Experimental Settings
 * 
 *   Enemy Stances:
 *   - Enemies can use stance motions for idling such as chanting,
 *     guarding, etc.
 *   - Requires VisuMZ_1_BattleCore!
 *   - This is not available normally since animations are not available for
 *     enemies with the base RPG Maker MZ core scripts.
 *   - Disable this to use the default animation flow for enemies.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 *
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * Special Thanks To
 * 
 * * Green Kel
 * * Ækashics
 * * Swift Illusion
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.25: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused some Dragonbones animations to be unable to play
 *    on map sprites if they are facing specific directions. Fix made by Irina.
 * 
 * Version 1.24: February 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that the "Flip Actors" and "Flip Enemies" parameters did not
 *    work properly after using a scale X notetag. Fix made by Olivia.
 * 
 * Version 1.23: January 20, 2023
 * * Feature Update!
 * ** Guard animations should no longer temporarily default to idle stances if
 *    an unnamed animation does not exist if the battler is guarding. Update
 *    made by Irina.
 * 
 * Version 1.22: December 15, 2022
 * * Compatibility Update!
 * ** Should now work with RPG Maker MZ version 1.6.1's updated Pixi JS version
 *    of 5.3.12 from 5.2.4. If ya don't have this plugin updated and you are
 *    using 5.3.12 onward, your battlers won't be loading.
 * 
 * Version 1.21: November 24, 2022
 * * Bug Fixes!
 * ** Custom motions now work better with non-actor participants during actions
 *    involving dragonbones battlers. Fix made by Arisu.
 * 
 * Version 1.20: November 17, 2022
 * * Bug Fixes!
 * ** "Damage" motion wasn't working properly for actors. This should now be
 *    fixed and working properly.
 * * Bug Fixes!
 * ** "Escape" motion should now work properly with Dragonbones actors. Idle
 *    motions will no longer take priority over them.
 * 
 * Version 1.19: November 10, 2022
 * * Bug Fixes!
 * ** Fixed a bug from the v1.18 update that prevented custom motions from
 *    being displayed properly with actors. Fix made by Irina.
 * 
 * Version 1.18: October 13, 2022
 * * Compatibility Update!
 * ** Plugin should be more compatible with VisuMZ_3_VisualStateEffect.
 * 
 * Version 1.17: January 27, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Added Plugin Command Parameter for "Picture: Play Dragonbones Animation":
 * *** Finish: Revert Idle?
 * **** Revert animation to 'idle' animation after finishing?
 * **** Added by Irina
 *
 * Version 1.16: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.15: June 18, 2021
 * * Compatibility Update
 * ** Compatibility update with Elements and Status Menu Core's trait hues.
 *    These will be affected by the notetags and/or Plugin Parameters applied.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Ækashics:
 * *** <Dragonbones Hue Affected>
 * *** <Dragonbones No Hue>
 * **** Determines if this enemy's Dragonbones battler is affected by hues
 *      or not. This will bypass the Plugin Parameter's default value.
 * ** New Plugin Parameter added by Irina and sponsored by Ækashics:
 * *** Plugin Parameters > Battler Settings > Default > Enemy Hue Affected?
 * **** Affect hues for enemies with Dragonbones battlers?
 * **** This will be disabled by default. Enable it or set it to true to make
 *      it work properly.
 * 
 * Version 1.14: April 2, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_StateTooltips plugin.
 * 
 * Version 1.13: March 19, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Experimental: Enemy Stances
 * **** Allows enemies to utilize stance motions for idling such as chanting,
 *      guarding, etc.
 * **** Requires VisuMZ_1_BattleCore!
 * **** This is not available normally since animations are not available for
 *      enemies with the base RPG Maker MZ core scripts.
 * **** Disable this to use the default animation flow for enemies.
 * 
 * Version 1.12: February 19, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash upon teleporting with an altering
 *    Dragonbones armature load without a base sprite. Fix made by Irina.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Fixed a bug involving the changing of a Dragonbones battler in-battle to
 *    prevent multiple instances being added at once. Fix made by Irina.
 * 
 * Version 1.10: January 22, 2021
 * * Bug Fixes!
 * ** Upon changing map sprites, Dragonbones characters would become skewed.
 *    This should no longer happen.
 * * Documentation Update!
 * ** Updated help file for new features.
 * * New Features!
 * ** Map Sprite: Actor Change Settings new Plugin Command parameters
 * *** "Walk Rate" and "Dash Rate" modifiers added.
 * 
 * Version 1.09: November 29, 2020
 * * Bug Fixes!
 * ** Dragonbones height for actors is no longer affected by frame divisibility
 *    for SV Actors to skew the positions of height data. Fix made by Arisu.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Updated help file for new features.
 * * New Features!
 * ** Two new notetags have been added for map sprites by Irina.
 * *** <Dragonbones Sprite Walk Rate: x>
 * *** <Dragonbones Sprite Dash Rate: x>
 * **** These two new notetags allow you to animate specific Dragonbones
 *      animations at a different speed when walking or dashing. These speed
 *      multipliers will stack multiplicatively with the time scale.
 * 
 * Version 1.07: October 25, 2020
 * * Bug Fixes!
 * ** Dead animations for actors no longer keep looping upon motion refreshes.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for new features.
 * * New Features!
 * ** New plugin parameter added by Irina.
 * *** Plugin Parameters > Battler Settings > Idle Bypass > List
 * **** This is a list of animations that will not return back to the idle
 *      animation after completion. Remove them if you want them to revert back
 *      to the idle animation after completion. Add to the list if you want
 *      animations to stay in their final frame.
 * 
 * Version 1.06: October 18, 2020
 * * Bug Fixes!
 * ** Enemies with Dragonbones battlers transforming into other enemies with
 *    Dragonbones battlers will now attach the sprites properly. Fix by Yanfly.
 * ** Enemies with Dragonbones battlers transforming into enemies without them
 *    will now remove the non-transformed bitmap.
 * * Documentation Update!
 * ** Added the 'Dragonbones Naming' section.
 * 
 * Version 1.05: October 4, 2020
 * * Bug Fixes!
 * ** Selected Dragonbones battlers will no longer leave behind a residual
 *    blink effect. Fix made by Irina.
 * ** There should be no more crashes from map events that have been previously
 *    deleted but not cleared from the map event list. Fix made by Irina.
 * 
 * Version 1.04: September 20, 2020
 * * Bug Fixes!
 * ** Hidden enemies with Dragonbones should be invisible at the start of
 *    battle. Fix made by Yanfly.
 * 
 * Version 1.03: September 13, 2020
 * * Compatibility Update!
 * ** Added compatibility with the new Battle Core v1.04 features!
 * 
 * Version 1.02: September 6, 2020
 * * Bug Fixes!
 * ** Previously, a Dragonbones battler does not show the blinking indicator if
 *    the battler is a selected target. This is now fixed. Fix made by Yanfly.
 * ** Prevents a crash now if no bitmap is detected for the main sprite.
 * 
 * Version 1.01: August 30, 2020
 * * Bug Fixes!
 * ** Erasing a picture no longer causes a crash when changing scenes. Fix made
 *    by Yanfly.
 * * Compatibility Update
 * ** Added compatibility for VisuStella MZ's Visual State Effects.
 *
 * Version 1.00: August 24, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Battler_ActorChange
 * @text Battler: Actor Change Settings
 * @desc Change target actor's Dragonbones armature settings for battle.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Filename:str
 * @text Filename
 * @parent ActorID:num
 * @desc Change the armature's filename.
 * @default name
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @parent ActorID:num
 * @desc Change the armature's Offset X value.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent ActorID:num
 * @desc Change the armature's Offset Y value.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale X
 * @parent ActorID:num
 * @desc Change the armature's Scale X value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale Y
 * @parent ActorID:num
 * @desc Change the armature's Scale Y value.
 * @default 1.0
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @parent ActorID:num
 * @desc Change the armature's Time Scale value.
 * @default 1.0
 *
 * @arg Width:eval
 * @text Width
 * @parent ActorID:num
 * @desc Change the battler width size.
 * @default 64
 *
 * @arg Height:eval
 * @text Height
 * @parent ActorID:num
 * @desc Change the battler height size.
 * @default 64
 *
 * @arg DefaultMotions
 * @text Motion Settings
 *
 * @arg MotionWalk:str
 * @text Walk
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default walk
 *
 * @arg MotionWait:str
 * @text Wait
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default wait
 *
 * @arg MotionChant:str
 * @text Chant
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default chant
 *
 * @arg MotionGuard:str
 * @text Guard
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default guard
 *
 * @arg MotionDamage:str
 * @text Damage
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default damage
 *
 * @arg MotionEvade:str
 * @text Evade
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default evade
 *
 * @arg MotionThrust:str
 * @text Thrust
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default thrust
 *
 * @arg MotionSwing:str
 * @text Swing
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default swing
 *
 * @arg MotionMissile:str
 * @text Missile
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default missile
 *
 * @arg MotionSkill:str
 * @text Skill
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default skill
 *
 * @arg MotionSpell:str
 * @text Spell
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default spell
 *
 * @arg MotionItem:str
 * @text Item
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default item
 *
 * @arg MotionEscape:str
 * @text Escape
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default escape
 *
 * @arg MotionVictory:str
 * @text Victory
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default victory
 *
 * @arg MotionDying:str
 * @text Dying
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default dying
 *
 * @arg MotionAbnormal:str
 * @text Abnormal
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default abnormal
 *
 * @arg MotionSleep:str
 * @text Sleep
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default sleep
 *
 * @arg MotionDead:str
 * @text Dead
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default dead
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorChange
 * @text Map Sprite: Actor Change Settings
 * @desc Change target actor's Dragonbones armature settings for map sprites.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Filename:str
 * @text Filename
 * @parent ActorID:num
 * @desc Change the armature's filename.
 * @default name
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @parent ActorID:num
 * @desc Change the armature's Offset X value.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent ActorID:num
 * @desc Change the armature's Offset Y value.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale X
 * @parent ActorID:num
 * @desc Change the armature's Scale X value.
 * @default 0.5
 *
 * @arg ScaleY:eval
 * @text Scale Y
 * @parent ActorID:num
 * @desc Change the armature's Scale Y value.
 * @default 0.5
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @parent ActorID:num
 * @desc Change the armature's Time Scale value.
 * @default 1.0
 *
 * @arg WalkRate:eval
 * @text Walk Rate
 * @parent TimeScale:eval
 * @desc Change the armature's walk animation rate.
 * @default 1.0
 *
 * @arg DashRate:eval
 * @text Dash Rate
 * @parent TimeScale:eval
 * @desc Change the armature's dash animation rate.
 * @default 1.0
 *
 * @arg Width:eval
 * @text Width
 * @parent ActorID:num
 * @desc Change the armature's width value.
 * @default 48
 *
 * @arg Height:eval
 * @text Height
 * @parent ActorID:num
 * @desc Change the armature's height.
 * @default 48
 *
 * @arg FlipSettings
 * @text Flip Settings
 *
 * @arg FlipLeft:eval
 * @text Flip Left?
 * @parent FlipSettings
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing left-ward directions?
 * @default false
 *
 * @arg FlipRight:eval
 * @text Flip Right?
 * @parent FlipSettings
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing right-ward directions?
 * animation is found?
 * @default false
 *
 * @arg Animations
 * @text Motion Settings
 *
 * @arg Idle:str
 * @text Idle
 * @parent Animations
 * @desc Base idle animation name used.
 * @default idle
 *
 * @arg Walk:str
 * @text Walk
 * @parent Animations
 * @desc Base walk animation name used.
 * @default walk
 *
 * @arg Dash:str
 * @text Dash
 * @parent Animations
 * @desc Base dash animation name used.
 * @default dash
 *
 * @arg Jump:str
 * @text Jump
 * @parent Animations
 * @desc Base jump animation name used.
 * @default jump
 *
 * @arg LadderIdle:str
 * @text Ladder (Idle)
 * @parent Animations
 * @desc Base ladder idle animation name used.
 * @default ladderidle
 *
 * @arg LadderClimb:str
 * @text Ladder (Climb)
 * @parent Animations
 * @desc Base ladder climbing animation name used.
 * @default ladderclimb
 *
 * @arg RopeIdle:str
 * @text Rope (Idle)
 * @parent Animations
 * @desc Base rope idle animation name used.
 * @default ropeidle
 *
 * @arg RopeClimb:str
 * @text Rope (Climb)
 * @parent Animations
 * @desc Base rope climbing animation name used.
 * @default ropecllmb
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorAnimationPlay
 * @text Map Sprite: Actor Play Animation
 * @desc Target actor plays a custom Dragonbones animation.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorAnimationStop
 * @text Map Sprite: Actor Stop Animation
 * @desc Stops a target actor's custom Dragonbones animation.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_EventAnimationPlay
 * @text Map Sprite: Event Play Animation
 * @desc Target event plays a custom Dragonbones animation.
 *
 * @arg EventID:eval
 * @text Event ID
 * @desc Select which Event ID to affect.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_EventAnimationStop
 * @text Map Sprite: Event Stop Animation
 * @desc Stops a target event's custom Dragonbones animation.
 *
 * @arg EventID:eval
 * @text Event ID
 * @desc Select which Event ID to affect.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_FollowerAnimationPlay
 * @text Map Sprite: Follower Play Animation
 * @desc Target follower plays a custom Dragonbones animation.
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @desc Select which Follower Index to affect.
 * @default 0
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_FollowerAnimationStop
 * @text Map Sprite: Follower Stop Animation
 * @desc Stops a target follower's custom Dragonbones animation.
 *
 * @arg FollowerIndex:eval
 * @text Follower ID
 * @desc Select which Follower Index to affect.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_PlayerAnimationPlay
 * @text Map Sprite: Player Play Animation
 * @desc Player plays a custom Dragonbones animation.
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_PlayerAnimationStop
 * @text Map Sprite: Player Stop Animation
 * @desc Stops player's custom Dragonbones animation.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_SetupDragonbones
 * @text Picture: Dragonbones Setup
 * @desc Setup a Dragonbones armature for a picture.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID(s) to give a Dragonbones armature.
 * @default 1
 *
 * @arg Filename:str
 * @text Armature Filename
 * @desc What is the armature's filename?
 * @default Untitled
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation once it starts.
 * @default Idle
 *
 * @arg OffsetX:eval
 * @text Offset: X
 * @desc Default X offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset: Y
 * @desc Default Y offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale: X
 * @desc Default X scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale: Y
 * @desc Default Y scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @desc Default time scale for this Dragonbones armature.
 * Higher values play faster. Lower values play slower.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_DragonbonesAnimation
 * @text Picture: Play Dragonbones Animation
 * @desc Make an existing Dragonbones armature attached to a picture play an animation.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @arg IdleFinish:eval
 * @text Finish: Revert Idle?
 * @parent FlipSettings
 * @type boolean
 * @on Revert
 * @off Freeze
 * @desc Revert animation to 'idle' animation after finishing?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_DragonbonesOffset
 * @text Picture: Offset Dragonbones
 * @desc Offset the X, Y attachment point of the Dragonbones armature.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg OffsetX:eval
 * @text Offset: X
 * @desc X offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset: Y
 * @desc Y offset value for this Dragonbones armature.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_ScaleDragonbones
 * @text Picture: Scale Dragonbones
 * @desc Change the scaling values of the Dragonbones armature.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg ScaleX:eval
 * @text Scale: X
 * @desc X scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale: Y
 * @desc Y scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_TimeScaleDragonbones
 * @text Picture: Time Scale Dragonbones
 * @desc Change the speed at which Dragonbones animations play.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @desc Default time scale for this Dragonbones armature.
 * Higher values play faster. Lower values play slower.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param DragonbonesUnion
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Main
 * @text Main Settings
 *
 * @param AssetsPath:str
 * @text Assets Path
 * @parent Main
 * @desc The filepath to the directory that houses all the Dragonbone files.
 * @default ./dragonbones_assets/
 *
 * @param General:struct
 * @text General Settings
 * @parent Main
 * @type struct<General>
 * @desc A set of general settings pertaining to all uses of Dragonbones.
 * @default {"Defaults":"","LoadAnimation:str":"idle","LoopingAnimations:arraystr":"[\"idle\",\"walk\",\"wait\",\"chant\",\"guard\",\"dying\",\"abnormal\",\"sleep\",\"dash\",\"ladderidle\",\"ladderclimb\",\"ropeidle\",\"ropeclimb\"]","SkeletalData":"","SkeKey:str":"dbData","SkeExt:str":"_ske.json","TextureData":"","TexKey:str":"texData","TexExt:str":"_tex.json","TextureAsset":"","TxaKey:str":"texAsset","TxaExt:str":"_tex.png"}
 *
 * @param Battler:struct
 * @text Battler Settings
 * @parent Main
 * @type struct<Battler>
 * @desc A set of general settings pertaining to Dragonbones battlers.
 * @default {"Defaults":"","OffsetX:num":"0","OffsetY:num":"0","ScaleX:num":"1.0","FlipActors:eval":"false","FlipEnemies:eval":"false","ScaleY:num":"1.0","TimeScale:num":"1.0","Width:num":"64","Height:num":"64","IdleBypass":"","IdleBypassList:arraystr":"[\"dead\",\"escape\",\"victory\"]","DefaultMotions":"","MotionWalk:str":"walk","MotionWait:str":"wait","MotionChant:str":"chant","MotionGuard:str":"guard","MotionDamage:str":"damage","MotionEvade:str":"evade","MotionThrust:str":"thrust","MotionSwing:str":"swing","MotionMissile:str":"missile","MotionSkill:str":"skill","MotionSpell:str":"spell","MotionItem:str":"item","MotionEscape:str":"escape","MotionVictory:str":"victory","MotionDying:str":"dying","MotionAbnormal:str":"abnormal","MotionSleep:str":"sleep","MotionDead:str":"dead"}
 *
 * @param MapSprite:struct
 * @text Map Sprite Settings
 * @parent Main
 * @type struct<MapSprite>
 * @desc A set of general settings pertaining to Dragonbones map sprites.
 * @default {"Defaults":"","OffsetX:num":"0","OffsetY:num":"0","ScaleX:num":"0.5","FlipLeft:eval":"false","FlipRight:eval":"false","ScaleY:num":"0.5","TimeScale:num":"1.0","Width:num":"48","Height:num":"48","Animations":"","Idle:str":"idle","Walk:str":"walk","WalkTimer:num":"2","Dash:str":"dash","Jump:str":"jump","LadderIdle:str":"ladderidle","LadderClimb:str":"ladderclimb","RopeIdle:str":"ropeidle","RopeClimb:str":"ropecllmb"}
 * 
 * @param Experimental
 * 
 * @param EnemyStances:eval
 * @text Enemy Stances
 * @parent Experimental
 * @type boolean
 * @on Enable Stances
 * @off No Stances
 * @desc Enemies can use stance motions for idling such as
 * chanting, guarding, etc. Requires VisuMZ_1_BattleCore!
 * @default false
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Defaults
 *
 * @param LoadAnimation:str
 * @text Loaded Animation
 * @parent Defaults
 * @desc The default animation to play once a Dragonbones armature is loaded.
 * @default idle
 *
 * @param LoopingAnimations:arraystr
 * @text Looping Animations
 * @parent Defaults
 * @type string[]
 * @desc Force these animations to become looping animations even if they don't loop in Dragonbones.
 * @default ["idle","walk","wait","chant","guard","dying","abnormal","sleep","dash","ladderidle","ladderclimb","ropeidle","ropeclimb"]
 *
 * @param SkeletalData
 * @text Skeletal Data
 *
 * @param SkeKey:str
 * @text Key
 * @parent SkeletalData
 * @desc Key used to determine where skeletal data is stored.
 * @default dbData
 *
 * @param SkeExt:str
 * @text Extension
 * @parent SkeletalData
 * @desc Extension used to determine which files contain skeletal data.
 * @default _ske.json
 *
 * @param TextureData
 * @text Texture Data
 *
 * @param TexKey:str
 * @text Key
 * @parent TextureData
 * @desc Key used to determine where texture data is stored.
 * @default texData
 *
 * @param TexExt:str
 * @text Extension
 * @parent TextureData
 * @desc Extension used to determine which files contain texture data.
 * @default _tex.json
 *
 * @param TextureAsset
 * @text Texture Asset
 *
 * @param TxaKey:str
 * @text Key
 * @parent TextureAsset
 * @desc Key used to determine where texture assets are stored.
 * @default texAsset
 *
 * @param TxaExt:str
 * @text Extension
 * @parent TextureAsset
 * @desc Extension used to determine which files contain texture assets.
 * @default _tex.png
 *
 */
/* ----------------------------------------------------------------------------
 * Battler Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battler:
 *
 * @param Defaults
 * @text Default Settings
 *
 * @param HueAffected:eval
 * @text Enemy Hue Affected?
 * @parent Defaults
 * @type boolean
 * @on Affect Hues
 * @off No Hues
 * @desc Affect hues for enemies with Dragonbones battlers?
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Defaults
 * @desc Default X offset for battler sprites.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Defaults
 * @desc Default Y offset for battler sprites.
 * @default 0
 *
 * @param ScaleX:num
 * @text Scale: X
 * @parent Defaults
 * @desc Default scale for X used by Dragonbones battlers.
 * @default 1.0
 *
 * @param FlipActors:eval
 * @text Flip for Actors?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value into negative automatically for all actors?
 * @default false
 *
 * @param FlipEnemies:eval
 * @text Flip for Enemies?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value into negative automatically for all enemies?
 * @default false
 *
 * @param ScaleY:num
 * @text Scale: Y
 * @parent Defaults
 * @desc Default scale for Y used by Dragonbones battlers.
 * @default 1.0
 *
 * @param TimeScale:num
 * @text Time Scale
 * @parent Defaults
 * @desc The rate at which animations play.
 * Higher numbers go faster.
 * @default 1.0
 *
 * @param Width:num
 * @text Width
 * @parent Defaults
 * @desc Treat battler sprites as if they have this width.
 * Used for Action Sequences.
 * @default 64
 *
 * @param Height:num
 * @text Height
 * @parent Defaults
 * @desc Treat battler sprites as if they have this height.
 * Used for Action Sequences.
 * @default 64
 *
 * @param IdleBypass
 * @text Idle Bypass
 *
 * @param IdleBypassList:arraystr
 * @text List
 * @parent IdleBypass
 * @type combo[]
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc This is a list of animations that will not return back to the idle animation after completion.
 * @default ["dead","escape","victory"]
 *
 * @param DefaultMotions
 * @text Default Motions
 *
 * @param MotionWalk:str
 * @text Walk
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default walk
 *
 * @param MotionWait:str
 * @text Wait
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default wait
 *
 * @param MotionChant:str
 * @text Chant
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default chant
 *
 * @param MotionGuard:str
 * @text Guard
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default guard
 *
 * @param MotionDamage:str
 * @text Damage
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default damage
 *
 * @param MotionEvade:str
 * @text Evade
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default evade
 *
 * @param MotionThrust:str
 * @text Thrust
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default thrust
 *
 * @param MotionSwing:str
 * @text Swing
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default swing
 *
 * @param MotionMissile:str
 * @text Missile
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default missile
 *
 * @param MotionSkill:str
 * @text Skill
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default skill
 *
 * @param MotionSpell:str
 * @text Spell
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default spell
 *
 * @param MotionItem:str
 * @text Item
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default item
 *
 * @param MotionEscape:str
 * @text Escape
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default escape
 *
 * @param MotionVictory:str
 * @text Victory
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default victory
 *
 * @param MotionDying:str
 * @text Dying
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default dying
 *
 * @param MotionAbnormal:str
 * @text Abnormal
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default abnormal
 *
 * @param MotionSleep:str
 * @text Sleep
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default sleep
 *
 * @param MotionDead:str
 * @text Dead
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default dead
 *
 */
/* ----------------------------------------------------------------------------
 * Map Sprite Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MapSprite:
 *
 * @param Defaults
 * @text Default Settings
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Defaults
 * @desc Default X offset for map sprites.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Defaults
 * @desc Default Y offset for map sprites.
 * @default 0
 *
 * @param ScaleX:num
 * @text Scale: X
 * @parent Defaults
 * @desc Default scale for X used by Dragonbones map sprites.
 * @default 0.5
 *
 * @param FlipLeft:eval
 * @text Flip Left?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing left-ward directions?
 * @default false
 *
 * @param FlipRight:eval
 * @text Flip Right?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing right-ward directions?
 * animation is found?
 * @default false
 *
 * @param ScaleY:num
 * @text Scale: Y
 * @parent Defaults
 * @desc Default scale for Y used by Dragonbones map sprites.
 * @default 0.5
 *
 * @param TimeScale:num
 * @text Time Scale
 * @parent Defaults
 * @desc The rate at which animations play.
 * Higher numbers go faster.
 * @default 1.0
 *
 * @param Width:num
 * @text Width
 * @parent Defaults
 * @desc Treat map sprites as if they have this width.
 * Used for various plugins.
 * @default 48
 *
 * @param Height:num
 * @text Height
 * @parent Defaults
 * @desc Treat map sprites as if they have this height.
 * Used for various plugins.
 * @default 48
 *
 * @param Animations
 * @text Motion Settings
 *
 * @param Idle:str
 * @text Idle
 * @parent Animations
 * @desc Base idle animation name used.
 * @default idle
 *
 * @param Walk:str
 * @text Walk
 * @parent Animations
 * @desc Base walk animation name used.
 * @default walk
 *
 * @param WalkTimer:num
 * @text Walk Timer
 * @parent Walk:str
 * @desc Number of frames to count as walking so that an idle animation isn't immediately forced upon stopping.
 * @default 2
 *
 * @param Dash:str
 * @text Dash
 * @parent Animations
 * @desc Base dash animation name used.
 * @default dash
 *
 * @param Jump:str
 * @text Jump
 * @parent Animations
 * @desc Base jump animation name used.
 * @default jump
 *
 * @param LadderIdle:str
 * @text Ladder (Idle)
 * @parent Animations
 * @desc Base ladder idle animation name used.
 * @default ladderidle
 *
 * @param LadderClimb:str
 * @text Ladder (Climb)
 * @parent Animations
 * @desc Base ladder climbing animation name used.
 * @default ladderclimb
 *
 * @param RopeIdle:str
 * @text Rope (Idle)
 * @parent Animations
 * @desc Base rope idle animation name used.
 * @default ropeidle
 *
 * @param RopeClimb:str
 * @text Rope (Climb)
 * @parent Animations
 * @desc Base rope climbing animation name used.
 * @default ropecllmb
 *
 */
//=============================================================================

const _0x39f1a0=_0x562f;function _0x1e6e(){const _0x500d25=['enemy','initDragonbonesData','performActionEndMembers','Battler','dispose','checkDragonbonesStringTags','shared','filename','factory','setFrame','update','clearTryEscaping','Sprite_Actor_updateFrame','isItem','isActing','Picture_DragonbonesAnimation','Game_Actor_performAction','push','isHidden','isPlaying','command357','Idle','prototype','data','Animation','map','FlipLeft','Height','parameters','isGuardWaiting','setupDragonbones','spell','performActionDragonbonesUnion','MapSprite_PlayerAnimationStop','isSceneMap','animationNames','1022886TUYVyz','guard','isInputting','MapSprite_EventAnimationStop','_subject','TxaExt','_dragonbonesFlipDirection','setupDragonbonesDataCommentTags','ScaleX','Game_Battler_requestMotionRefresh','Dash','erasePictureDragonbonesUnion','call','prepareNextLoadArmature','refreshMotion','picture','Game_Actor_performDamage','_spriteset','includes','isActor','Game_Battler_requestMotion','MotionDying','attack','damage','test','loadNextArmature','isUndecided','performCollapseDragonbonesUnion','jump','Sprite_Actor_updateBitmap','requestMotionRefresh','Game_Enemy_performCollapse','_dragonbonesBattlerData','updateFrameDragonbonesUnion','playDragonbonesAnimation','isSceneBattle','MotionEvade','Game_Enemy_performDamage','loadArmature','_dragonbonesSpriteContainer','20fYjLNv','max','1wnwiUZ','MapSprite_FollowerAnimationPlay','dashRate','createDefaultPicture','isChanting','Sprite_Enemy_refreshMotion','addChildAt','initMembers','Dragonbones','_target','bitmap','buildArmatureDisplay','5079400RGmfrF','Width','once','Sprite_Actor_updateShadow','Sprite_Enemy_initMembers','Picture_ScaleDragonbones','MotionMissile','RopeIdle','playTimes','parseTextureAtlasData','opacity','VisuMZ_1_EventsMoveCore','ConvertParams','MotionWalk','timeScale','updateShadow','index','scaleY','status','MotionGuard','find','Filename','Sprite_Enemy_setHue','erasePicture','playDragonbonesMotion','code','Picture_SetupDragonbones','_dragonbonesName','_hue','MotionWait','isDying','MapSprite_ActorAnimationStop','Game_Enemy_transform','Game_Actor_setup','_playtestF7Looping','play','ScaleY','TxaKey','isTryingToEscape','_escaped','initMembersDragonbonesUnion','isDragonbonesHueAffected','addDragonbonesChild','onEscapeFailure','lastFileName','Game_Event_setupPageSettings','stateMotionIndex','STR','Sprite_Character_updateBitmap','MotionEscape','MotionSpell','MapSprite_FollowerAnimationStop','_battler','586917PzoKQn','Picture_DragonbonesOffset','IdleFinish','ARRAYJSON','processLoad','offsetY','PictureID','animations','24372SOdboL','_character','General','walk','Game_Enemy_performAction','note','refresh','currentDragonbonesAnimation','lastAnimationName','dragonbonesData','This\x20is\x20a\x20static\x20class','Game_Enemy_setup','_requestedDragonbonesAnimation','BattleManager_endBattle','setup','offsetX','follower','setupDragonbonesDataNotetags','parseDragonBonesData','item','_dragonbonesFilename','OffsetX','1212618vgpAQm','isOnRope','PixiFactory','performAction','updateCharacterFrame','startMotion','bind','Sprite_Character_updateCharacterFrame','version','canActorPlayDragonbonesMotion','realMoveSpeed','7YIWvpx','format','Sprite_Enemy_updateBitmap','IdleBypassList','chant','setLastPluginCommandInterpreter','match','SkeKey','transform','dragonbonesFlip','hasDragonbonesBattler','ARRAYEVAL','154ASoiTv','updateDragonbonesTimeScale','page','FlipEnemies','updateCharacterFrameDragonbonesUnion','name','EventID','onLoadDragonbones','BattleManager_onEscapeFailure','Picture_TimeScaleDragonbones','clearPageSettings','LoadQueue','setDragonbonesHue','Scene_Battle_terminate','followers','toLowerCase','flipLeft','updateDragonbones','MotionChant','isJumping','Game_Player_refresh','isDashing','dying','RopeClimb','getLastPluginCommandInterpreter','Walk','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','filter','revertToIdle','VisuMZ_1_OptionsCore','round','event','complete','dead','Game_Interpreter_PluginCommand','Sprite_Character_initialize','performDamage','_dragonbonesSpriteData','performAttack','idle','skill','FollowerIndex','867228ZnNkYN','load','ropeidle','_targets','removeChild','height','Loader','ActorID','MotionAbnormal','ARRAYSTR','TimeScale','VisuMZ_0_CoreEngine','scale','_stateSprite','MotionSwing','Settings','MotionSkill','dragonbonesSpriteData','requestMotion','LoopingAnimations','Sprite_Picture_update','endBattle','width','battler','_weaponSprite','description','playDragonbonesIdleAnimation','411778EphXnn','OffsetY','MotionSleep','FUNC','initialize','eventId','DefaultAnimation','performDamageDragonbonesUnion','realPictureId','isAlive','60ftrESb','_dragonbonesMoveTimer','setHue','Sprite_Actor_startMotion','ropeclimb','AssetsPath','animation','_pictureContainer','dragonbonesAnimation','onComplete','createBaseDragonbonesSprite','motion','_enemyId','_pictures','LoadedFilenames','attachSpritesToDistortionSprite','direction','MotionDamage','MapSprite_PlayerAnimationPlay','Game_Picture_initialize','ARRAYSTRUCT','abnormal','isMoving','setupDragonbonesData','concat','loadComplete','VisuMZ_1_BattleCore','addChild','5.3.12','constructor','MapSprite_ActorChange','walkRate','CallbackQueue','disposeDragonbones','_dragonbones','createArmature','isAttack','HueAffected','processEscape','terminate','victory','_baseDragonbonesSprite','shift','Game_Battler_performActionEndMembers','Game_Follower_refresh','updateFrame','SkeExt','setupPageSettings','sleep','scaleX','Sprite_Enemy_setBattler','testLoaded','MotionDead','MapSprite','Sprite_Picture_initialize','updateShadowDragonbonesUnion','_escaping','STRUCT','hasDragonbones','updateBitmap','list','Game_Event_clearPageSettings','trim','MotionThrust','escape','exit','Sprite_Actor_initMembers','registerCommand','updateDragonbonesAnimation','LadderClimb','Jump','type','VERSION','add','loading','_battleAniSpeedLooping','Game_Actor_performAttack','_dragonbonesAnimation','TexKey','LadderIdle','Game_CharacterBase_update','testArmature','performCollapse','DragonbonesUnion','ARRAYFUNC','isCompleted','BattleManager_processEscape','updateDragonbonesProperties','isGuard','parse','MotionItem','requestDragonbonesAnimation','FlipActors','addDragonbonesAnimationDirections','wait','_lastPluginCommandInterpreter','LoadAnimation','toUpperCase','actor','runQueuedCallbacks','_scene','dash','_dragonbonesData','_mainSprite','updateDragonbonesArmature','isEnemy','visible','updateDragonbonesUnion','flipRight','return\x200','defineProperty'];_0x1e6e=function(){return _0x500d25;};return _0x1e6e();}(function(_0x3284d4,_0x2df059){const _0x208a53=_0x562f,_0x4c4d5c=_0x3284d4();while(!![]){try{const _0x3b0b96=-parseInt(_0x208a53(0x23a))/0x1*(-parseInt(_0x208a53(0x173))/0x2)+parseInt(_0x208a53(0x117))/0x3+parseInt(_0x208a53(0x283))/0x4*(parseInt(_0x208a53(0x17d))/0x5)+parseInt(_0x208a53(0x210))/0x6*(parseInt(_0x208a53(0x122))/0x7)+parseInt(_0x208a53(0x246))/0x8+-parseInt(_0x208a53(0x27b))/0x9*(parseInt(_0x208a53(0x238))/0xa)+-parseInt(_0x208a53(0x12e))/0xb*(parseInt(_0x208a53(0x158))/0xc);if(_0x3b0b96===_0x2df059)break;else _0x4c4d5c['push'](_0x4c4d5c['shift']());}catch(_0x2e212d){_0x4c4d5c['push'](_0x4c4d5c['shift']());}}}(_0x1e6e,0x54939));var label='DragonbonesUnion',tier=tier||0x0,dependencies=[_0x39f1a0(0x242)],pluginData=$plugins[_0x39f1a0(0x149)](function(_0x484eb0){const _0x344ca4=_0x39f1a0;return _0x484eb0[_0x344ca4(0x258)]&&_0x484eb0[_0x344ca4(0x171)][_0x344ca4(0x222)]('['+label+']');})[0x0];VisuMZ[label][_0x39f1a0(0x167)]=VisuMZ[label][_0x39f1a0(0x167)]||{},VisuMZ[_0x39f1a0(0x252)]=function(_0x10a8f3,_0x4ec6ed){const _0x3f7382=_0x39f1a0;for(const _0x3d3a34 in _0x4ec6ed){if(_0x3d3a34[_0x3f7382(0x128)](/(.*):(.*)/i)){const _0x22f3f2=String(RegExp['$1']),_0x1f0c03=String(RegExp['$2'])[_0x3f7382(0x1de)]()[_0x3f7382(0x1bb)]();let _0x5ac4b2,_0x398442,_0x14bfa9;switch(_0x1f0c03){case'NUM':_0x5ac4b2=_0x4ec6ed[_0x3d3a34]!==''?Number(_0x4ec6ed[_0x3d3a34]):0x0;break;case'ARRAYNUM':_0x398442=_0x4ec6ed[_0x3d3a34]!==''?JSON[_0x3f7382(0x1d6)](_0x4ec6ed[_0x3d3a34]):[],_0x5ac4b2=_0x398442[_0x3f7382(0x205)](_0x365d98=>Number(_0x365d98));break;case'EVAL':_0x5ac4b2=_0x4ec6ed[_0x3d3a34]!==''?eval(_0x4ec6ed[_0x3d3a34]):null;break;case _0x3f7382(0x12d):_0x398442=_0x4ec6ed[_0x3d3a34]!==''?JSON[_0x3f7382(0x1d6)](_0x4ec6ed[_0x3d3a34]):[],_0x5ac4b2=_0x398442[_0x3f7382(0x205)](_0x2e7312=>eval(_0x2e7312));break;case'JSON':_0x5ac4b2=_0x4ec6ed[_0x3d3a34]!==''?JSON[_0x3f7382(0x1d6)](_0x4ec6ed[_0x3d3a34]):'';break;case _0x3f7382(0x27e):_0x398442=_0x4ec6ed[_0x3d3a34]!==''?JSON[_0x3f7382(0x1d6)](_0x4ec6ed[_0x3d3a34]):[],_0x5ac4b2=_0x398442[_0x3f7382(0x205)](_0x3b76b2=>JSON[_0x3f7382(0x1d6)](_0x3b76b2));break;case _0x3f7382(0x176):_0x5ac4b2=_0x4ec6ed[_0x3d3a34]!==''?new Function(JSON[_0x3f7382(0x1d6)](_0x4ec6ed[_0x3d3a34])):new Function(_0x3f7382(0x1ea));break;case _0x3f7382(0x1d1):_0x398442=_0x4ec6ed[_0x3d3a34]!==''?JSON[_0x3f7382(0x1d6)](_0x4ec6ed[_0x3d3a34]):[],_0x5ac4b2=_0x398442[_0x3f7382(0x205)](_0x414f2f=>new Function(JSON[_0x3f7382(0x1d6)](_0x414f2f)));break;case _0x3f7382(0x275):_0x5ac4b2=_0x4ec6ed[_0x3d3a34]!==''?String(_0x4ec6ed[_0x3d3a34]):'';break;case _0x3f7382(0x161):_0x398442=_0x4ec6ed[_0x3d3a34]!==''?JSON[_0x3f7382(0x1d6)](_0x4ec6ed[_0x3d3a34]):[],_0x5ac4b2=_0x398442[_0x3f7382(0x205)](_0x1e5e1f=>String(_0x1e5e1f));break;case _0x3f7382(0x1b6):_0x14bfa9=_0x4ec6ed[_0x3d3a34]!==''?JSON[_0x3f7382(0x1d6)](_0x4ec6ed[_0x3d3a34]):{},_0x5ac4b2=VisuMZ['ConvertParams']({},_0x14bfa9);break;case _0x3f7382(0x191):_0x398442=_0x4ec6ed[_0x3d3a34]!==''?JSON[_0x3f7382(0x1d6)](_0x4ec6ed[_0x3d3a34]):[],_0x5ac4b2=_0x398442['map'](_0x1d063b=>VisuMZ['ConvertParams']({},JSON[_0x3f7382(0x1d6)](_0x1d063b)));break;default:continue;}_0x10a8f3[_0x22f3f2]=_0x5ac4b2;}}return _0x10a8f3;},(_0x1ad578=>{const _0x2929b8=_0x39f1a0,_0x1410f7=_0x1ad578['name'];for(const _0x37ed96 of dependencies){if(!Imported[_0x37ed96]){alert(_0x2929b8(0x148)[_0x2929b8(0x123)](_0x1410f7,_0x37ed96)),SceneManager[_0x2929b8(0x1be)]();break;}}const _0x44ad30=_0x1ad578[_0x2929b8(0x171)];if(_0x44ad30[_0x2929b8(0x128)](/\[Version[ ](.*?)\]/i)){const _0x5f3e9f=Number(RegExp['$1']);_0x5f3e9f!==VisuMZ[label][_0x2929b8(0x11f)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x1410f7,_0x5f3e9f)),SceneManager[_0x2929b8(0x1be)]());}if(_0x44ad30[_0x2929b8(0x128)](/\[Tier[ ](\d+)\]/i)){const _0x461831=Number(RegExp['$1']);_0x461831<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2929b8(0x123)](_0x1410f7,_0x461831,tier)),SceneManager[_0x2929b8(0x1be)]()):tier=Math[_0x2929b8(0x239)](_0x461831,tier);}VisuMZ[_0x2929b8(0x252)](VisuMZ[label][_0x2929b8(0x167)],_0x1ad578[_0x2929b8(0x208)]);})(pluginData);function DragonbonesManager(){const _0x177c69=_0x39f1a0;throw new Error(_0x177c69(0x28d));}function _0x562f(_0x5cbb89,_0x593c59){const _0x1e6e45=_0x1e6e();return _0x562f=function(_0x562ff0,_0x41180e){_0x562ff0=_0x562ff0-0x115;let _0x4d9b84=_0x1e6e45[_0x562ff0];return _0x4d9b84;},_0x562f(_0x5cbb89,_0x593c59);}DragonbonesManager[_0x39f1a0(0x182)]=VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x167)][_0x39f1a0(0x182)],DragonbonesManager[_0x39f1a0(0x179)]=VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x167)][_0x39f1a0(0x285)][_0x39f1a0(0x1dd)],DragonbonesManager[_0x39f1a0(0x18b)]=[],DragonbonesManager[_0x39f1a0(0x139)]=[],DragonbonesManager[_0x39f1a0(0x19d)]=[],DragonbonesManager[_0x39f1a0(0x228)]=function(_0x3193ed,_0x25e1a8,_0x223a3f,_0x46917c){const _0x39ccc0=_0x39f1a0;if(!_0x223a3f)_0x223a3f=SceneManager['_scene'];if(!_0x46917c)_0x46917c=_0x39ccc0(0x1ce);if(_0x223a3f[_0x46917c]){const _0x5df100=_0x223a3f[_0x46917c];_0x5df100&&(_0x223a3f[_0x39ccc0(0x15c)](_0x5df100),_0x5df100[_0x39ccc0(0x1f0)]());}this[_0x39ccc0(0x236)](_0x3193ed,DragonbonesManager[_0x39ccc0(0x1b0)][_0x39ccc0(0x11d)](this,_0x3193ed,_0x25e1a8,_0x223a3f,_0x46917c));},DragonbonesManager[_0x39f1a0(0x1b0)]=function(_0x2a9d84,_0x3b72dd,_0x462243,_0x3c7434){const _0x4b9e6a=_0x39f1a0,_0x6533f2=this['createArmature'](_0x2a9d84);_0x6533f2&&(_0x462243[_0x4b9e6a(0x198)](_0x6533f2),_0x6533f2['x']=Graphics['width']/0x2,_0x6533f2['y']=Graphics['height']*0x3/0x4,_0x3b72dd=_0x3b72dd||DragonbonesManager['DefaultAnimation'],_0x3b72dd=_0x3b72dd[_0x4b9e6a(0x13d)](),_0x6533f2['animation'][_0x4b9e6a(0x282)][_0x3b72dd]&&_0x6533f2[_0x4b9e6a(0x183)][_0x4b9e6a(0x269)](_0x3b72dd)),_0x462243[_0x3c7434]=_0x6533f2;},DragonbonesManager[_0x39f1a0(0x1a0)]=function(_0x1a9977){const _0x168529=_0x39f1a0,_0x3ef1b9=dragonBones[_0x168529(0x119)][_0x168529(0x1f4)][_0x168529(0x245)](_0x1a9977);if(!_0x3ef1b9)return null;for(const _0xaa5125 in _0x3ef1b9[_0x168529(0x183)][_0x168529(0x282)]){if(_0xaa5125[_0x168529(0x13d)]()===_0xaa5125)continue;_0x3ef1b9[_0x168529(0x183)]['animations'][_0xaa5125[_0x168529(0x13d)]()]=_0x3ef1b9[_0x168529(0x183)]['animations'][_0xaa5125],delete _0x3ef1b9['animation'][_0x168529(0x282)][_0xaa5125];}for(let _0x45cdfa=0x0;_0x45cdfa<_0x3ef1b9['animation'][_0x168529(0x20f)]['length'];_0x45cdfa++){_0x3ef1b9['animation']['animationNames'][_0x45cdfa]=_0x3ef1b9[_0x168529(0x183)]['animationNames'][_0x45cdfa][_0x168529(0x13d)]();}const _0x1dfd31=VisuMZ['DragonbonesUnion'][_0x168529(0x167)][_0x168529(0x285)][_0x168529(0x16b)];for(let _0xa2641b of _0x1dfd31){_0xa2641b=_0xa2641b['toLowerCase']()[_0x168529(0x1bb)]();_0x3ef1b9['animation'][_0x168529(0x282)][_0xa2641b]&&(_0x3ef1b9['animation']['animations'][_0xa2641b][_0x168529(0x24e)]=0x0);for(let _0x5c600f=0x1;_0x5c600f<=0x9;_0x5c600f++){const _0x15a498=_0xa2641b+_0x5c600f;_0x3ef1b9[_0x168529(0x183)]['animations'][_0x15a498]&&(_0x3ef1b9[_0x168529(0x183)][_0x168529(0x282)][_0x15a498][_0x168529(0x24e)]=0x0);}}return _0x3ef1b9[_0x168529(0x183)]['animations'][DragonbonesManager[_0x168529(0x179)]]&&_0x3ef1b9[_0x168529(0x183)][_0x168529(0x269)](DragonbonesManager[_0x168529(0x179)]),_0x3ef1b9;},DragonbonesManager[_0x39f1a0(0x236)]=function(_0x53b125,_0x53eb07){const _0x4f8c10=_0x39f1a0;_0x53b125=_0x53b125[_0x4f8c10(0x1bb)](),DragonbonesManager['LoadQueue'][_0x4f8c10(0x1fd)](_0x53b125),DragonbonesManager[_0x4f8c10(0x19d)][_0x4f8c10(0x1fd)](_0x53eb07);const _0x402564=PIXI[_0x4f8c10(0x15e)][_0x4f8c10(0x1f2)];!_0x402564[_0x4f8c10(0x1c7)]&&this[_0x4f8c10(0x229)]();},DragonbonesManager[_0x39f1a0(0x229)]=function(){const _0x11b8f4=_0x39f1a0;DragonbonesManager[_0x11b8f4(0x139)]['length']>0x0?this['prepareNextLoadArmature']():this[_0x11b8f4(0x1e0)]();},DragonbonesManager[_0x39f1a0(0x21d)]=function(){const _0xdea3e9=_0x39f1a0,_0xa583c=DragonbonesManager[_0xdea3e9(0x139)]['shift']();if(this[_0xdea3e9(0x18b)][_0xdea3e9(0x222)](_0xa583c))this[_0xdea3e9(0x229)]();else!this['LoadedFilenames'][_0xdea3e9(0x222)](_0xa583c)&&this[_0xdea3e9(0x27f)](_0xa583c);},DragonbonesManager[_0x39f1a0(0x27f)]=function(_0x1f35f0){const _0x18dbe9=_0x39f1a0,_0x2718a4=PIXI[_0x18dbe9(0x1c5)]>=_0x18dbe9(0x199);this[_0x18dbe9(0x18b)][_0x18dbe9(0x1fd)](_0x1f35f0),this[_0x18dbe9(0x272)]=_0x1f35f0;const _0x32f5dc=VisuMZ[_0x18dbe9(0x1d0)][_0x18dbe9(0x167)][_0x18dbe9(0x285)],_0x525d0d=DragonbonesManager['AssetsPath'],_0x3efe1a=PIXI['Loader']['shared'];_0x3efe1a['add'](_0x1f35f0+_0x32f5dc[_0x18dbe9(0x129)],_0x525d0d+_0x1f35f0+_0x32f5dc[_0x18dbe9(0x1ab)]),_0x3efe1a[_0x18dbe9(0x1c6)](_0x1f35f0+_0x32f5dc[_0x18dbe9(0x1cb)],_0x525d0d+_0x1f35f0+_0x32f5dc['TexExt']),_0x3efe1a['add'](_0x1f35f0+_0x32f5dc[_0x18dbe9(0x26b)],_0x525d0d+_0x1f35f0+_0x32f5dc[_0x18dbe9(0x215)]),_0x2718a4?(_0x3efe1a[_0x18dbe9(0x159)](_0x3efe1a),_0x3efe1a[_0x18dbe9(0x186)][_0x18dbe9(0x248)](()=>DragonbonesManager[_0x18dbe9(0x196)](_0x3efe1a,_0x3efe1a['resources']))):(_0x3efe1a[_0x18dbe9(0x248)](_0x18dbe9(0x14e),DragonbonesManager[_0x18dbe9(0x196)],this),_0x3efe1a[_0x18dbe9(0x159)]());},DragonbonesManager['loadComplete']=function(_0x5b4ab2,_0x51c5a8){const _0x20e39c=_0x39f1a0,_0x93c1fb=VisuMZ[_0x20e39c(0x1d0)][_0x20e39c(0x167)][_0x20e39c(0x285)],_0x2b3144=this[_0x20e39c(0x272)],_0x5ebade=dragonBones[_0x20e39c(0x119)][_0x20e39c(0x1f4)];_0x5ebade[_0x20e39c(0x295)](_0x51c5a8[_0x2b3144+_0x93c1fb['SkeKey']][_0x20e39c(0x203)]),_0x5ebade[_0x20e39c(0x24f)](_0x51c5a8[_0x2b3144+_0x93c1fb[_0x20e39c(0x1cb)]][_0x20e39c(0x203)],_0x51c5a8[_0x2b3144+_0x93c1fb[_0x20e39c(0x26b)]]['texture']),this[_0x20e39c(0x229)]();},DragonbonesManager[_0x39f1a0(0x1e0)]=function(){const _0x4c16c6=_0x39f1a0;while(DragonbonesManager[_0x4c16c6(0x19d)]['length']>0x0){const _0x29ba17=DragonbonesManager[_0x4c16c6(0x19d)][_0x4c16c6(0x1a7)]();if(_0x29ba17)_0x29ba17(this);}},PluginManager[_0x39f1a0(0x1c0)](pluginData[_0x39f1a0(0x133)],'Battler_ActorChange',_0x361f21=>{const _0x5b10e7=_0x39f1a0;if(!$gameMap)return;VisuMZ['ConvertParams'](_0x361f21,_0x361f21);const _0x5921d8=$gameActors[_0x5b10e7(0x1df)](_0x361f21['ActorID']);if(!_0x5921d8)return;_0x5921d8[_0x5b10e7(0x230)]={'battler':_0x361f21[_0x5b10e7(0x25b)],'scaleX':_0x361f21['ScaleX'],'scaleY':_0x361f21[_0x5b10e7(0x26a)],'offsetX':_0x361f21[_0x5b10e7(0x116)],'offsetY':_0x361f21[_0x5b10e7(0x174)],'timeScale':_0x361f21[_0x5b10e7(0x162)],'width':_0x361f21[_0x5b10e7(0x247)],'height':_0x361f21[_0x5b10e7(0x207)],'motion':{'walk':_0x361f21[_0x5b10e7(0x253)],'wait':_0x361f21['MotionWait'],'chant':_0x361f21[_0x5b10e7(0x140)],'guard':_0x361f21['MotionGuard'],'damage':_0x361f21[_0x5b10e7(0x18e)],'evade':_0x361f21['MotionEvade'],'thrust':_0x361f21[_0x5b10e7(0x1bc)],'swing':_0x361f21[_0x5b10e7(0x166)],'missile':_0x361f21[_0x5b10e7(0x24c)],'skill':_0x361f21[_0x5b10e7(0x168)],'spell':_0x361f21[_0x5b10e7(0x278)],'item':_0x361f21['MotionItem'],'escape':_0x361f21[_0x5b10e7(0x277)],'victory':_0x361f21['MotionVictory'],'dying':_0x361f21[_0x5b10e7(0x225)],'abnormal':_0x361f21[_0x5b10e7(0x160)],'sleep':_0x361f21[_0x5b10e7(0x175)],'dead':_0x361f21[_0x5b10e7(0x1b1)]}};}),SceneManager[_0x39f1a0(0x233)]=function(){const _0x428904=_0x39f1a0;return this[_0x428904(0x1e1)]&&this[_0x428904(0x1e1)][_0x428904(0x19a)]===Scene_Battle;},SceneManager[_0x39f1a0(0x20e)]=function(){const _0x307769=_0x39f1a0;return this['_scene']&&this[_0x307769(0x1e1)][_0x307769(0x19a)]===Scene_Map;},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x1d3)]=BattleManager[_0x39f1a0(0x1a3)],BattleManager[_0x39f1a0(0x1a3)]=function(){const _0x22285b=_0x39f1a0;return this[_0x22285b(0x1b5)]=!![],VisuMZ[_0x22285b(0x1d0)][_0x22285b(0x1d3)][_0x22285b(0x21c)](this);},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x136)]=BattleManager[_0x39f1a0(0x271)],BattleManager[_0x39f1a0(0x271)]=function(){const _0x208ebc=_0x39f1a0;VisuMZ[_0x208ebc(0x1d0)][_0x208ebc(0x136)][_0x208ebc(0x21c)](this),setTimeout(this[_0x208ebc(0x1f7)][_0x208ebc(0x11d)](this),0x1f4);},BattleManager[_0x39f1a0(0x1f7)]=function(){const _0x435e60=_0x39f1a0;this[_0x435e60(0x1b5)]=![];},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x290)]=BattleManager[_0x39f1a0(0x16d)],BattleManager[_0x39f1a0(0x16d)]=function(_0x4f8ce9){const _0x14a94b=_0x39f1a0;this[_0x14a94b(0x1b5)]=![],VisuMZ[_0x14a94b(0x1d0)][_0x14a94b(0x290)][_0x14a94b(0x21c)](this,_0x4f8ce9);},BattleManager[_0x39f1a0(0x26c)]=function(){const _0x1db992=_0x39f1a0;return this[_0x1db992(0x1b5)]||this[_0x1db992(0x26d)];},Game_BattlerBase['prototype'][_0x39f1a0(0x16f)]=function(){const _0x462de3=_0x39f1a0;if(!SceneManager[_0x462de3(0x233)]())return null;if(!SceneManager[_0x462de3(0x1e1)][_0x462de3(0x221)])return null;return SceneManager[_0x462de3(0x1e1)][_0x462de3(0x221)]['findTargetSprite'](this);},Game_BattlerBase['prototype'][_0x39f1a0(0x1ed)]=function(){const _0xe6fbf=_0x39f1a0,_0x524ddb=VisuMZ['DragonbonesUnion']['Settings'][_0xe6fbf(0x1ef)];this['_dragonbonesBattlerData']={'battler':'','scaleX':_0x524ddb[_0xe6fbf(0x218)],'scaleY':_0x524ddb[_0xe6fbf(0x26a)],'width':_0x524ddb[_0xe6fbf(0x247)],'height':_0x524ddb[_0xe6fbf(0x207)],'offsetX':_0x524ddb[_0xe6fbf(0x116)],'offsetY':_0x524ddb[_0xe6fbf(0x174)],'timeScale':_0x524ddb['TimeScale'],'motion':{'walk':_0x524ddb[_0xe6fbf(0x253)],'wait':_0x524ddb[_0xe6fbf(0x263)],'chant':_0x524ddb[_0xe6fbf(0x140)],'guard':_0x524ddb[_0xe6fbf(0x259)],'damage':_0x524ddb[_0xe6fbf(0x18e)],'evade':_0x524ddb[_0xe6fbf(0x234)],'thrust':_0x524ddb['MotionThrust'],'swing':_0x524ddb[_0xe6fbf(0x166)],'missile':_0x524ddb[_0xe6fbf(0x24c)],'skill':_0x524ddb[_0xe6fbf(0x168)],'spell':_0x524ddb[_0xe6fbf(0x278)],'item':_0x524ddb[_0xe6fbf(0x1d7)],'escape':_0x524ddb['MotionEscape'],'victory':_0x524ddb['MotionVictory'],'dying':_0x524ddb['MotionDying'],'abnormal':_0x524ddb['MotionAbnormal'],'sleep':_0x524ddb['MotionSleep'],'dead':_0x524ddb[_0xe6fbf(0x1b1)]}};if(_0x524ddb['FlipActors']&&this[_0xe6fbf(0x223)]())this[_0xe6fbf(0x230)]['scaleX']*=-0x1;if(_0x524ddb[_0xe6fbf(0x131)]&&this[_0xe6fbf(0x1e6)]())this[_0xe6fbf(0x230)][_0xe6fbf(0x1ae)]*=-0x1;},Game_BattlerBase[_0x39f1a0(0x202)][_0x39f1a0(0x194)]=function(){const _0x3c8b8d=_0x39f1a0,_0x5710f1=VisuMZ[_0x3c8b8d(0x1d0)][_0x3c8b8d(0x167)]['Battler'],_0x425e10=(this[_0x3c8b8d(0x223)]()?this[_0x3c8b8d(0x1df)]():this[_0x3c8b8d(0x1ec)]())[_0x3c8b8d(0x288)],_0x330290=this[_0x3c8b8d(0x28c)]();_0x425e10[_0x3c8b8d(0x128)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:BATTLER|SKIN|NAME):[ ]*(.*)>/i)&&(_0x330290[_0x3c8b8d(0x16f)]=String(RegExp['$1'])[_0x3c8b8d(0x1bb)]());_0x425e10[_0x3c8b8d(0x128)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER):[ ]*(.*)>/i)&&(_0x330290[_0x3c8b8d(0x16f)]=String(RegExp['$1'])['trim']());if(_0x425e10[_0x3c8b8d(0x128)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SCALE:[ ](.*),[ ](.*)>/i)){_0x330290['scaleX']=Number(RegExp['$1']),_0x330290[_0x3c8b8d(0x257)]=Number(RegExp['$2']);if(_0x5710f1[_0x3c8b8d(0x1d9)]&&this[_0x3c8b8d(0x223)]())_0x330290[_0x3c8b8d(0x1ae)]*=-0x1;if(_0x5710f1[_0x3c8b8d(0x131)]&&this[_0x3c8b8d(0x1e6)]())_0x330290[_0x3c8b8d(0x1ae)]*=-0x1;}if(_0x425e10['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:SCALEX|SCALE X):[ ](.*)>/i)){_0x330290[_0x3c8b8d(0x1ae)]=Number(RegExp['$1']);if(_0x5710f1[_0x3c8b8d(0x1d9)]&&this[_0x3c8b8d(0x223)]())_0x330290[_0x3c8b8d(0x1ae)]*=-0x1;if(_0x5710f1['FlipEnemies']&&this[_0x3c8b8d(0x1e6)]())_0x330290[_0x3c8b8d(0x1ae)]*=-0x1;}_0x425e10[_0x3c8b8d(0x128)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SCALEY:[ ](.*)>/i)&&(_0x330290[_0x3c8b8d(0x257)]=Number(RegExp['$1']));_0x425e10[_0x3c8b8d(0x128)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]OFFSET:[ ](.*),[ ](.*)>/i)&&(_0x330290['offsetX']=Number(RegExp['$1']),_0x330290[_0x3c8b8d(0x280)]=Number(RegExp['$2']));_0x425e10[_0x3c8b8d(0x128)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:OFFSETX|OFFSET X):[ ](.*)>/i)&&(_0x330290[_0x3c8b8d(0x292)]=Number(RegExp['$1']));_0x425e10[_0x3c8b8d(0x128)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:OFFSETY|OFFSET Y):[ ](.*)>/i)&&(_0x330290[_0x3c8b8d(0x280)]=Number(RegExp['$1']));_0x425e10[_0x3c8b8d(0x128)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:TIMESCALE|TIME SCALE):[ ](.*)>/i)&&(_0x330290[_0x3c8b8d(0x254)]=Number(RegExp['$1']));_0x425e10['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SIZE:[ ](.*),[ ](.*)>/i)&&(_0x330290[_0x3c8b8d(0x16e)]=Number(RegExp['$1']),_0x330290[_0x3c8b8d(0x15d)]=Number(RegExp['$2']));_0x425e10['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]WIDTH:[ ](.*)>/i)&&(_0x330290[_0x3c8b8d(0x16e)]=Number(RegExp['$1']));_0x425e10[_0x3c8b8d(0x128)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]HEIGHT:[ ](.*)>/i)&&(_0x330290['height']=Number(RegExp['$1']));const _0x22db03=_0x425e10[_0x3c8b8d(0x128)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:ANI|MOTION)[ ](.*):[ ](.*)>/gi);if(_0x22db03)for(const _0x557034 of _0x22db03){_0x557034['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:ANI|MOTION)[ ](.*):[ ](.*)>/i);const _0xbe36f9=String(RegExp['$1'])['toLowerCase']()[_0x3c8b8d(0x1bb)](),_0x233fba=String(RegExp['$2'])['trim']();_0x330290[_0x3c8b8d(0x188)][_0xbe36f9]=_0x233fba;}if(_0x425e10[_0x3c8b8d(0x128)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER) (?:SETTINGS|SETTING)>\s*([\s\S]*)\s*<\/(?:DB|DRAGONBONE|DRAGONBONES BATTLER) (?:SETTINGS|SETTING)>/i)){const _0x322c25=String(RegExp['$1']);_0x322c25['match'](/(?:BATTLER|SKIN|NAME|FILENAME):[ ]*(.*)/i)&&(_0x330290[_0x3c8b8d(0x16f)]=String(RegExp['$1'])[_0x3c8b8d(0x1bb)]());if(_0x322c25[_0x3c8b8d(0x128)](/SCALE:[ ](.*),[ ](.*)/i)){_0x330290[_0x3c8b8d(0x1ae)]=Number(RegExp['$1']),_0x330290[_0x3c8b8d(0x257)]=Number(RegExp['$2']);if(_0x5710f1[_0x3c8b8d(0x1d9)]&&this[_0x3c8b8d(0x223)]())_0x330290['scaleX']*=-0x1;if(_0x5710f1[_0x3c8b8d(0x131)]&&this[_0x3c8b8d(0x1e6)]())_0x330290['scaleX']*=-0x1;}if(_0x322c25['match'](/(?:SCALEX|SCALE X):[ ](.*)/i)){_0x330290[_0x3c8b8d(0x1ae)]=Number(RegExp['$1']);if(_0x5710f1[_0x3c8b8d(0x1d9)]&&this['isActor']())_0x330290[_0x3c8b8d(0x1ae)]*=-0x1;if(_0x5710f1[_0x3c8b8d(0x131)]&&this[_0x3c8b8d(0x1e6)]())_0x330290[_0x3c8b8d(0x1ae)]*=-0x1;}_0x322c25[_0x3c8b8d(0x128)](/(?:SCALEY|SCALE Y):[ ](.*)/i)&&(_0x330290[_0x3c8b8d(0x257)]=Number(RegExp['$1']));_0x322c25[_0x3c8b8d(0x128)](/OFFSET:[ ](.*),[ ](.*)/i)&&(_0x330290[_0x3c8b8d(0x292)]=Number(RegExp['$1']),_0x330290[_0x3c8b8d(0x280)]=Number(RegExp['$2']));_0x322c25[_0x3c8b8d(0x128)](/(?:OFFSETX|OFFSET X):[ ](.*)/i)&&(_0x330290[_0x3c8b8d(0x292)]=Number(RegExp['$1']));_0x322c25[_0x3c8b8d(0x128)](/(?:OFFSETY|OFFSET Y):[ ](.*)/i)&&(_0x330290[_0x3c8b8d(0x280)]=Number(RegExp['$1']));_0x322c25[_0x3c8b8d(0x128)](/(?:TIMESCALE|TIME SCALE):[ ](.*)/i)&&(_0x330290[_0x3c8b8d(0x254)]=Number(RegExp['$1']));_0x322c25[_0x3c8b8d(0x128)](/SIZE:[ ](.*),[ ](.*)/i)&&(_0x330290[_0x3c8b8d(0x16e)]=Number(RegExp['$1']),_0x330290[_0x3c8b8d(0x15d)]=Number(RegExp['$2']));_0x322c25[_0x3c8b8d(0x128)](/WIDTH:[ ](.*)/i)&&(_0x330290['width']=Number(RegExp['$1']));_0x322c25[_0x3c8b8d(0x128)](/HEIGHT:[ ](.*)/i)&&(_0x330290[_0x3c8b8d(0x15d)]=Number(RegExp['$1']));const _0x2c9102=_0x322c25[_0x3c8b8d(0x128)](/(?:ANI|MOTION)[ ](.*):[ ](.*)/gi);if(_0x2c9102)for(const _0x24824e of _0x2c9102){_0x24824e[_0x3c8b8d(0x128)](/(?:ANI|MOTION)[ ](.*):[ ](.*)/i);const _0x316905=String(RegExp['$1'])['toLowerCase']()[_0x3c8b8d(0x1bb)](),_0x595f16=String(RegExp['$2'])[_0x3c8b8d(0x1bb)]();_0x330290['motion'][_0x316905]=_0x595f16;}}},Game_BattlerBase[_0x39f1a0(0x202)]['dragonbonesData']=function(){const _0x2c2f22=_0x39f1a0;if(this[_0x2c2f22(0x230)]!==undefined)return this[_0x2c2f22(0x230)];return this['initDragonbonesData'](),this[_0x2c2f22(0x194)](),this[_0x2c2f22(0x230)];},Game_BattlerBase[_0x39f1a0(0x202)][_0x39f1a0(0x12c)]=function(){const _0x1e0579=_0x39f1a0;return this[_0x1e0579(0x16f)]()&&this['dragonbonesData']()[_0x1e0579(0x16f)]!=='';},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x224)]=Game_Battler['prototype']['requestMotion'],Game_Battler['prototype'][_0x39f1a0(0x16a)]=function(_0x458d7a){const _0x18a006=_0x39f1a0;VisuMZ[_0x18a006(0x1d0)][_0x18a006(0x224)]['call'](this,_0x458d7a),this['hasDragonbonesBattler']()&&this[_0x18a006(0x16f)]()[_0x18a006(0x25e)](_0x458d7a);},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x219)]=Game_Battler['prototype'][_0x39f1a0(0x22e)],Game_Battler[_0x39f1a0(0x202)][_0x39f1a0(0x22e)]=function(){const _0x565b59=_0x39f1a0;VisuMZ[_0x565b59(0x1d0)][_0x565b59(0x219)]['call'](this),this[_0x565b59(0x12c)]()&&this['battler']()[_0x565b59(0x172)]();},Game_Battler['prototype'][_0x39f1a0(0x1d8)]=function(_0x2dbf13){const _0x1bc497=_0x39f1a0;if(!this[_0x1bc497(0x12c)]())return;this['battler']()[_0x1bc497(0x232)](_0x2dbf13),[_0x1bc497(0x286),'idle'][_0x1bc497(0x222)](_0x2dbf13)?this[_0x1bc497(0x28f)]=![]:this[_0x1bc497(0x28f)]=!![];},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x1a8)]=Game_Battler[_0x39f1a0(0x202)][_0x39f1a0(0x1ee)],Game_Battler[_0x39f1a0(0x202)]['performActionEndMembers']=function(){const _0x2020e5=_0x39f1a0;this['hasDragonbonesBattler']()&&(this[_0x2020e5(0x28f)]=![]),VisuMZ[_0x2020e5(0x1d0)]['Game_Battler_performActionEndMembers'][_0x2020e5(0x21c)](this);},Game_Battler[_0x39f1a0(0x202)][_0x39f1a0(0x17a)]=function(){const _0xd73fa9=_0x39f1a0;if(!this['hasDragonbonesBattler']())return;this[_0xd73fa9(0x16a)](_0xd73fa9(0x227));},Game_Battler[_0x39f1a0(0x202)][_0x39f1a0(0x22b)]=function(){const _0x4e5539=_0x39f1a0;if(!this['hasDragonbonesBattler']())return;this[_0x4e5539(0x16a)](_0x4e5539(0x14f));},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x267)]=Game_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x291)],Game_Actor['prototype'][_0x39f1a0(0x291)]=function(_0x3aa096){const _0x33c427=_0x39f1a0;VisuMZ[_0x33c427(0x1d0)]['Game_Actor_setup']['call'](this,_0x3aa096),this[_0x33c427(0x1ed)](),this[_0x33c427(0x194)]();},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x1fc)]=Game_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x11a)],Game_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x11a)]=function(_0x5b5137){const _0x18d7d1=_0x39f1a0;this[_0x18d7d1(0x1d8)](_0x18d7d1(0x226)),VisuMZ[_0x18d7d1(0x1d0)]['Game_Actor_performAction']['call'](this,_0x5b5137);},VisuMZ[_0x39f1a0(0x1d0)]['Game_Actor_performAttack']=Game_Actor['prototype'][_0x39f1a0(0x154)],Game_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x154)]=function(){const _0x292c8e=_0x39f1a0;this[_0x292c8e(0x1d8)]('attack'),VisuMZ[_0x292c8e(0x1d0)][_0x292c8e(0x1c9)][_0x292c8e(0x21c)](this);},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x220)]=Game_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x152)],Game_Actor['prototype']['performDamage']=function(){const _0x1e4d05=_0x39f1a0;VisuMZ[_0x1e4d05(0x1d0)][_0x1e4d05(0x220)][_0x1e4d05(0x21c)](this),this[_0x1e4d05(0x17a)]();},VisuMZ[_0x39f1a0(0x1d0)]['Game_Actor_performCollapse']=Game_Actor['prototype'][_0x39f1a0(0x1cf)],Game_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x1cf)]=function(){const _0x5270dc=_0x39f1a0;VisuMZ[_0x5270dc(0x1d0)]['Game_Actor_performCollapse']['call'](this),this[_0x5270dc(0x22b)]();},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x28e)]=Game_Enemy[_0x39f1a0(0x202)]['setup'],Game_Enemy['prototype']['setup']=function(_0x273585,_0x54ba7e,_0x190151){const _0x5189f0=_0x39f1a0;VisuMZ['DragonbonesUnion'][_0x5189f0(0x28e)][_0x5189f0(0x21c)](this,_0x273585,_0x54ba7e,_0x190151),this['initDragonbonesData'](),this['setupDragonbonesData']();},VisuMZ['DragonbonesUnion'][_0x39f1a0(0x266)]=Game_Enemy[_0x39f1a0(0x202)]['transform'],Game_Enemy[_0x39f1a0(0x202)][_0x39f1a0(0x12a)]=function(_0x5c91fb){const _0x2f0e5f=_0x39f1a0,_0x1c8e20=this[_0x2f0e5f(0x189)];VisuMZ[_0x2f0e5f(0x1d0)][_0x2f0e5f(0x266)][_0x2f0e5f(0x21c)](this,_0x5c91fb),this['_enemyId']!==_0x1c8e20&&(this['initDragonbonesData'](),this['setupDragonbonesData']());},VisuMZ[_0x39f1a0(0x1d0)]['Game_Enemy_performAction']=Game_Enemy[_0x39f1a0(0x202)][_0x39f1a0(0x11a)],Game_Enemy[_0x39f1a0(0x202)][_0x39f1a0(0x11a)]=function(_0x3bb43b){const _0x427d5b=_0x39f1a0;VisuMZ[_0x427d5b(0x1d0)][_0x427d5b(0x287)][_0x427d5b(0x21c)](this,_0x3bb43b),this[_0x427d5b(0x20c)](_0x3bb43b);},Game_Enemy[_0x39f1a0(0x202)]['performActionDragonbonesUnion']=function(_0x2b6c26){const _0x4e9bd7=_0x39f1a0;if(!this[_0x4e9bd7(0x12c)]())return;this[_0x4e9bd7(0x1d8)](_0x4e9bd7(0x226));if(Imported[_0x4e9bd7(0x197)])return this['performActionMotions'](_0x2b6c26);if(_0x2b6c26[_0x4e9bd7(0x1a1)]())this['requestDragonbonesAnimation'](_0x4e9bd7(0x226));else{if(_0x2b6c26[_0x4e9bd7(0x1d5)]())this[_0x4e9bd7(0x16a)](_0x4e9bd7(0x211));else{if(_0x2b6c26['isMagicSkill']())this['requestMotion'](_0x4e9bd7(0x20b));else{if(_0x2b6c26['isSkill']())_0x2b6c26[_0x4e9bd7(0x296)]()[_0x4e9bd7(0x227)][_0x4e9bd7(0x1c4)]>0x0?this[_0x4e9bd7(0x1d8)]('attack'):this[_0x4e9bd7(0x16a)](_0x4e9bd7(0x156));else _0x2b6c26[_0x4e9bd7(0x1f9)]()&&this['requestMotion'](_0x4e9bd7(0x296));}}}},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x235)]=Game_Enemy[_0x39f1a0(0x202)][_0x39f1a0(0x152)],Game_Enemy[_0x39f1a0(0x202)][_0x39f1a0(0x152)]=function(){const _0x23d01d=_0x39f1a0;VisuMZ[_0x23d01d(0x1d0)][_0x23d01d(0x235)][_0x23d01d(0x21c)](this),this['performDamageDragonbonesUnion']();},VisuMZ['DragonbonesUnion'][_0x39f1a0(0x22f)]=Game_Enemy[_0x39f1a0(0x202)]['performCollapse'],Game_Enemy['prototype']['performCollapse']=function(){const _0x324c18=_0x39f1a0;VisuMZ[_0x324c18(0x1d0)][_0x324c18(0x22f)][_0x324c18(0x21c)](this),this[_0x324c18(0x22b)]();},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x13b)]=Scene_Battle[_0x39f1a0(0x202)][_0x39f1a0(0x1a4)],Scene_Battle['prototype'][_0x39f1a0(0x1a4)]=function(){const _0x4a8897=_0x39f1a0;this['_spriteset']['disposeDragonbones'](),VisuMZ['DragonbonesUnion'][_0x4a8897(0x13b)][_0x4a8897(0x21c)](this);},Sprite_Battler['prototype'][_0x39f1a0(0x26e)]=function(){const _0x51055e=_0x39f1a0;this[_0x51055e(0x19f)]=null,this[_0x51055e(0x261)]='';},Sprite_Battler[_0x39f1a0(0x202)]['setupDragonbones']=function(){const _0x4d1888=_0x39f1a0;this[_0x4d1888(0x19e)]();const _0xb2ab12=this[_0x4d1888(0x27a)][_0x4d1888(0x28c)]();this[_0x4d1888(0x261)]=_0xb2ab12[_0x4d1888(0x16f)],armatureName=_0xb2ab12[_0x4d1888(0x16f)],DragonbonesManager[_0x4d1888(0x236)](armatureName,this[_0x4d1888(0x135)][_0x4d1888(0x11d)](this)),this[_0x4d1888(0x244)]=new Bitmap(_0xb2ab12['width'],_0xb2ab12[_0x4d1888(0x15d)]),this[_0x4d1888(0x1e4)]&&(this[_0x4d1888(0x1e4)][_0x4d1888(0x244)]=new Bitmap(_0xb2ab12[_0x4d1888(0x16e)],_0xb2ab12['height']));},Sprite_Battler[_0x39f1a0(0x202)][_0x39f1a0(0x19e)]=function(){const _0x504081=_0x39f1a0;this[_0x504081(0x19f)]&&(this[_0x504081(0x237)]&&this[_0x504081(0x237)][_0x504081(0x15c)](this[_0x504081(0x19f)]),this[_0x504081(0x15c)](this[_0x504081(0x19f)]),this[_0x504081(0x19f)][_0x504081(0x1f0)](),delete this[_0x504081(0x19f)],delete this['_dragonbonesName']);},Sprite_Battler['prototype'][_0x39f1a0(0x135)]=function(){const _0x25dcba=_0x39f1a0,_0x164e58=this['_battler'][_0x25dcba(0x28c)]();this['_dragonbones']=DragonbonesManager[_0x25dcba(0x1a0)](_0x164e58[_0x25dcba(0x16f)]),!this['_dragonbonesSpriteContainer']&&(this[_0x25dcba(0x237)]=new Sprite(),this[_0x25dcba(0x237)]['addChild'](this['_dragonbones'])),this['addChildAt'](this[_0x25dcba(0x237)],0x0),this[_0x25dcba(0x18c)]&&(this[_0x25dcba(0x18c)](),this['_dragonbonesSpriteContainer'][_0x25dcba(0x198)](this[_0x25dcba(0x19f)])),this[_0x25dcba(0x172)](),this[_0x25dcba(0x19f)]['x']=_0x164e58[_0x25dcba(0x292)],this[_0x25dcba(0x19f)]['y']=_0x164e58[_0x25dcba(0x280)],this[_0x25dcba(0x19f)]['scale']['x']=_0x164e58[_0x25dcba(0x1ae)],this[_0x25dcba(0x19f)][_0x25dcba(0x164)]['y']=_0x164e58[_0x25dcba(0x257)],this['_battler']&&this[_0x25dcba(0x27a)][_0x25dcba(0x1fe)]()&&(this[_0x25dcba(0x250)]=0x0);},Sprite_Battler[_0x39f1a0(0x202)][_0x39f1a0(0x25e)]=function(_0x10c4b6){const _0x73683=_0x39f1a0;if(!this[_0x73683(0x19f)])return;if(_0x10c4b6===_0x73683(0x155)){if(this[_0x73683(0x27a)][_0x73683(0x264)]())_0x10c4b6=_0x73683(0x144);else this['_battler']['isGuard']()||this[_0x73683(0x27a)][_0x73683(0x209)]()?_0x10c4b6=_0x73683(0x211):_0x10c4b6=_0x73683(0x286);}const _0x5aae8e=this['_battler'][_0x73683(0x28c)]();if(_0x5aae8e['motion'][_0x10c4b6]){const _0x2c7261=_0x5aae8e[_0x73683(0x188)][_0x10c4b6];this[_0x73683(0x232)](_0x2c7261);}},Sprite_Battler[_0x39f1a0(0x202)][_0x39f1a0(0x232)]=function(_0x1d7890){const _0x31e46b=_0x39f1a0;_0x1d7890=_0x1d7890[_0x31e46b(0x13d)]();if(!this['_dragonbones'])return;[_0x31e46b(0x155),_0x31e46b(0x1db)][_0x31e46b(0x222)](_0x1d7890)&&this['_battler']['isGuard']()&&(_0x1d7890=_0x31e46b(0x211));const _0x403733=this[_0x31e46b(0x19f)][_0x31e46b(0x183)];if(_0x403733[_0x31e46b(0x282)][_0x1d7890]){const _0x1ef8be=_0x403733[_0x31e46b(0x28b)],_0x31cc92=[_0x31e46b(0x155),_0x31e46b(0x286),_0x31e46b(0x1db),_0x31e46b(0x126),'guard',_0x31e46b(0x144),'abnormal',_0x31e46b(0x1ad),_0x31e46b(0x14f)];if(_0x1ef8be===_0x1d7890&&_0x31cc92[_0x31e46b(0x222)](_0x1d7890))return;_0x403733[_0x31e46b(0x269)](_0x1d7890);}},Sprite_Battler[_0x39f1a0(0x202)][_0x39f1a0(0x13f)]=function(){const _0x37cb8a=_0x39f1a0;this[_0x37cb8a(0x12f)](),this[_0x37cb8a(0x1c1)](),this['updateDragonbonesSelection']();},Sprite_Battler['prototype'][_0x39f1a0(0x12f)]=function(){const _0x7def17=_0x39f1a0;if(!this[_0x7def17(0x19f)])return;let _0xbf9e53=this[_0x7def17(0x27a)][_0x7def17(0x28c)]()[_0x7def17(0x254)];const _0x46cd46=SceneManager[_0x7def17(0x1e1)];Imported[_0x7def17(0x163)]&&_0x46cd46[_0x7def17(0x268)]&&$gameTemp['_playTestFastMode']&&(_0xbf9e53*=0x2),Imported[_0x7def17(0x14b)]&&_0x46cd46[_0x7def17(0x1c8)]&&(_0xbf9e53*=(ConfigManager['battleAniSpeed']||0x0)+0x1),this[_0x7def17(0x19f)][_0x7def17(0x183)][_0x7def17(0x254)]=_0xbf9e53;},Sprite_Battler[_0x39f1a0(0x202)]['updateDragonbonesAnimation']=function(){const _0x4084d7=_0x39f1a0;if(!this[_0x4084d7(0x19f)])return;const _0xd77967=this[_0x4084d7(0x19f)][_0x4084d7(0x183)];if(_0xd77967[_0x4084d7(0x1d2)]){const _0x118446=_0xd77967[_0x4084d7(0x28b)];let _0x16aff5=VisuMZ['DragonbonesUnion']['Settings']['Battler'][_0x4084d7(0x125)];_0x16aff5===undefined&&(_0x16aff5=[_0x4084d7(0x14f),'escape',_0x4084d7(0x1a5)]),!_0x16aff5[_0x4084d7(0x222)](_0x118446)&&this['playDragonbonesIdleAnimation']();}},Sprite_Battler[_0x39f1a0(0x202)]['updateDragonbonesSelection']=function(){return;},Sprite_Battler[_0x39f1a0(0x202)][_0x39f1a0(0x172)]=function(){const _0x6f6397=_0x39f1a0;if(!this[_0x6f6397(0x19f)])return;const _0x3f71d2=this[_0x6f6397(0x27a)];if(!_0x3f71d2)return;if(_0x3f71d2[_0x6f6397(0x1e6)]()){const _0x533606=this[_0x6f6397(0x19f)]['animation'];if(_0x533606&&!_0x533606[_0x6f6397(0x1d2)])return;}if(this['canActorPlayDragonbonesMotion']()){const _0x42acd6=this['_dragonbones'][_0x6f6397(0x183)];if(_0x42acd6&&!_0x42acd6[_0x6f6397(0x1d2)])return;}_0x3f71d2[_0x6f6397(0x17c)]()&&this['playDragonbonesAnimation'](_0x6f6397(0x155));const _0x12d2f4=_0x3f71d2[_0x6f6397(0x274)]();if(_0x3f71d2[_0x6f6397(0x212)]()||_0x3f71d2[_0x6f6397(0x1fa)]())this['playDragonbonesMotion'](_0x6f6397(0x286));else{if(_0x12d2f4===0x3)this[_0x6f6397(0x25e)]('dead');else{if(_0x12d2f4===0x2)this[_0x6f6397(0x25e)](_0x6f6397(0x1ad));else{if(_0x3f71d2[_0x6f6397(0x223)]()&&BattleManager[_0x6f6397(0x26c)]())this[_0x6f6397(0x25e)](_0x6f6397(0x1bd));else{if(_0x3f71d2['isChanting']())this[_0x6f6397(0x25e)](_0x6f6397(0x126));else{if(_0x3f71d2[_0x6f6397(0x1d5)]()||_0x3f71d2[_0x6f6397(0x209)]())this[_0x6f6397(0x25e)](_0x6f6397(0x211));else{if(_0x12d2f4===0x1)this[_0x6f6397(0x25e)](_0x6f6397(0x192));else{if(_0x3f71d2[_0x6f6397(0x264)]())this[_0x6f6397(0x25e)]('idle');else _0x3f71d2[_0x6f6397(0x22a)]()?this['playDragonbonesMotion']('idle'):this['playDragonbonesMotion']('idle');}}}}}}}},Sprite_Battler[_0x39f1a0(0x202)][_0x39f1a0(0x120)]=function(){const _0x34f70e=_0x39f1a0;if(!this[_0x34f70e(0x27a)][_0x34f70e(0x223)]())return![];if(this[_0x34f70e(0x27a)]===BattleManager[_0x34f70e(0x214)])return!![];if(this['_battler']===BattleManager['actor']()&&this[_0x34f70e(0x27a)]['isInputting']())return!![];if(this[_0x34f70e(0x27a)]['_requestedDragonbonesAnimation'])return!![];if(BattleManager[_0x34f70e(0x243)]===this[_0x34f70e(0x27a)])return!![];if(BattleManager[_0x34f70e(0x15b)][_0x34f70e(0x222)](this[_0x34f70e(0x27a)]))return!![];return![];},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x25c)]=Sprite_Enemy[_0x39f1a0(0x202)][_0x39f1a0(0x17f)],Sprite_Enemy[_0x39f1a0(0x202)]['setHue']=function(_0x59d99f){const _0x453696=_0x39f1a0;this[_0x453696(0x26f)]()?this[_0x453696(0x13a)](_0x59d99f):VisuMZ[_0x453696(0x1d0)]['Sprite_Enemy_setHue'][_0x453696(0x21c)](this,_0x59d99f);},Sprite_Enemy[_0x39f1a0(0x202)][_0x39f1a0(0x26f)]=function(){const _0x336642=_0x39f1a0;if(!this[_0x336642(0x27a)])return![];if(!this['_dragonbones'])return![];const _0x2bdd76=this[_0x336642(0x27a)][_0x336642(0x1ec)]()[_0x336642(0x288)]||'';if(_0x2bdd76[_0x336642(0x128)](/<DRAGONBONES HUE AFFECTED>/i))return!![];else{if(_0x2bdd76[_0x336642(0x128)](/<DRAGONBONES NO HUE>/i))return![];}return VisuMZ[_0x336642(0x1d0)][_0x336642(0x167)]['Battler'][_0x336642(0x1a2)];},Sprite_Enemy[_0x39f1a0(0x202)][_0x39f1a0(0x13a)]=function(_0x31cf9c){const _0x3e5852=_0x39f1a0;this['_dragonbonesSpriteContainer'][_0x3e5852(0x262)]!==_0x31cf9c&&this['_dragonbonesSpriteContainer'][_0x3e5852(0x17f)](_0x31cf9c);},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x1bf)]=Sprite_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x241)],Sprite_Actor['prototype'][_0x39f1a0(0x241)]=function(){const _0x233df2=_0x39f1a0;VisuMZ[_0x233df2(0x1d0)][_0x233df2(0x1bf)]['call'](this),this[_0x233df2(0x26e)]();},VisuMZ[_0x39f1a0(0x1d0)]['Sprite_Actor_updateBitmap']=Sprite_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x1b8)],Sprite_Actor['prototype'][_0x39f1a0(0x1b8)]=function(){const _0x57ad4e=_0x39f1a0,_0x991a8f=this[_0x57ad4e(0x27a)];_0x991a8f[_0x57ad4e(0x12c)]()?(Sprite_Battler[_0x57ad4e(0x202)][_0x57ad4e(0x1b8)][_0x57ad4e(0x21c)](this),this[_0x57ad4e(0x261)]!==_0x991a8f[_0x57ad4e(0x28c)]()[_0x57ad4e(0x16f)]&&this[_0x57ad4e(0x20a)](),this[_0x57ad4e(0x13f)]()):(VisuMZ[_0x57ad4e(0x1d0)][_0x57ad4e(0x22d)][_0x57ad4e(0x21c)](this),this[_0x57ad4e(0x15c)](this[_0x57ad4e(0x19f)]));},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x180)]=Sprite_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x11c)],Sprite_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x11c)]=function(_0x27dce3){const _0x24ffd9=_0x39f1a0;VisuMZ[_0x24ffd9(0x1d0)][_0x24ffd9(0x180)][_0x24ffd9(0x21c)](this,_0x27dce3),this[_0x24ffd9(0x19a)][_0x24ffd9(0x133)]==='Sprite_Actor'&&this['playDragonbonesMotion'](_0x27dce3);},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x249)]=Sprite_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x255)],Sprite_Actor['prototype'][_0x39f1a0(0x255)]=function(){const _0xac4e20=_0x39f1a0;this[_0xac4e20(0x1b4)](),VisuMZ['DragonbonesUnion']['Sprite_Actor_updateShadow'][_0xac4e20(0x21c)](this),this[_0xac4e20(0x27a)]&&this['_battler']['hasDragonbonesBattler']()&&(this['_shadowSprite']['visible']=![]);},Sprite_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x1b4)]=function(){const _0x437428=_0x39f1a0;if(this[_0x437428(0x19a)]!==Sprite_Actor)return;let _0x2eaabf=!![];if(this[_0x437428(0x27a)]&&this[_0x437428(0x27a)][_0x437428(0x12c)]())_0x2eaabf=![];this['_mainSprite'][_0x437428(0x1e7)]=_0x2eaabf,this[_0x437428(0x170)][_0x437428(0x1e7)]=_0x2eaabf,this[_0x437428(0x165)][_0x437428(0x1e7)]=_0x2eaabf;},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x1f8)]=Sprite_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x1aa)],Sprite_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x1aa)]=function(){const _0x54d48b=_0x39f1a0;this[_0x54d48b(0x27a)]&&this[_0x54d48b(0x27a)]['hasDragonbonesBattler']()?this[_0x54d48b(0x231)]():VisuMZ['DragonbonesUnion']['Sprite_Actor_updateFrame'][_0x54d48b(0x21c)](this);},Sprite_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x231)]=function(){const _0x730a71=_0x39f1a0,_0x30e3b7=this[_0x730a71(0x1e4)]['bitmap'];if(_0x30e3b7){const _0xa958f4=_0x30e3b7['width'],_0x4f61c9=_0x30e3b7[_0x730a71(0x15d)];this[_0x730a71(0x1e4)]['setFrame'](0x0,0x0,_0xa958f4,_0x4f61c9),this[_0x730a71(0x1f5)](0x0,0x0,_0xa958f4,_0x4f61c9);}},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x24a)]=Sprite_Enemy[_0x39f1a0(0x202)][_0x39f1a0(0x241)],Sprite_Enemy[_0x39f1a0(0x202)]['initMembers']=function(){const _0x498c0e=_0x39f1a0;VisuMZ['DragonbonesUnion'][_0x498c0e(0x24a)][_0x498c0e(0x21c)](this),this['initMembersDragonbonesUnion']();},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x1af)]=Sprite_Enemy[_0x39f1a0(0x202)]['setBattler'],Sprite_Enemy[_0x39f1a0(0x202)]['setBattler']=function(_0x4a57ba){const _0x1f6d2b=_0x39f1a0;this[_0x1f6d2b(0x19e)](),VisuMZ[_0x1f6d2b(0x1d0)][_0x1f6d2b(0x1af)][_0x1f6d2b(0x21c)](this,_0x4a57ba);if(_0x4a57ba['isHidden']())this[_0x1f6d2b(0x250)]=0x0;},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x124)]=Sprite_Enemy[_0x39f1a0(0x202)][_0x39f1a0(0x1b8)],Sprite_Enemy[_0x39f1a0(0x202)][_0x39f1a0(0x1b8)]=function(){const _0x32b50b=_0x39f1a0,_0x23d8ab=this[_0x32b50b(0x27a)];_0x23d8ab['hasDragonbonesBattler']()?(Sprite_Battler[_0x32b50b(0x202)][_0x32b50b(0x1b8)][_0x32b50b(0x21c)](this),this[_0x32b50b(0x261)]!==_0x23d8ab['dragonbonesData']()[_0x32b50b(0x16f)]&&this['setupDragonbones'](),this[_0x32b50b(0x13f)](),this[_0x32b50b(0x17f)](this['_enemy']['battlerHue']())):(VisuMZ['DragonbonesUnion']['Sprite_Enemy_updateBitmap'][_0x32b50b(0x21c)](this),this['removeChild'](this[_0x32b50b(0x19f)]));},VisuMZ['DragonbonesUnion'][_0x39f1a0(0x23f)]=Sprite_Enemy[_0x39f1a0(0x202)][_0x39f1a0(0x21e)],Sprite_Enemy[_0x39f1a0(0x202)][_0x39f1a0(0x21e)]=function(){const _0x821638=_0x39f1a0;VisuMZ[_0x821638(0x1d0)][_0x821638(0x23f)]['call'](this);if(!VisuMZ[_0x821638(0x1d0)][_0x821638(0x167)]['EnemyStances'])return;const _0x274457=this[_0x821638(0x27a)];_0x274457&&_0x274457['hasDragonbonesBattler']()&&this['refreshMotionDragonbones']();},Sprite_Enemy['prototype']['refreshMotionDragonbones']=function(){const _0x1f8a28=_0x39f1a0,_0x33aeb3=this['_battler'];if(_0x33aeb3){const _0x36ea4a=_0x33aeb3[_0x1f8a28(0x274)]();if(_0x33aeb3[_0x1f8a28(0x212)]()||_0x33aeb3['isActing']())this[_0x1f8a28(0x25e)](_0x1f8a28(0x286));else{if(_0x36ea4a===0x3)this[_0x1f8a28(0x25e)](_0x1f8a28(0x14f));else{if(_0x36ea4a===0x2)this[_0x1f8a28(0x25e)]('sleep');else{if(_0x33aeb3[_0x1f8a28(0x23e)]())this['playDragonbonesMotion'](_0x1f8a28(0x126));else{if(_0x33aeb3[_0x1f8a28(0x1d5)]()||_0x33aeb3[_0x1f8a28(0x209)]())this['playDragonbonesMotion']('guard');else{if(_0x36ea4a===0x1)this[_0x1f8a28(0x25e)]('abnormal');else{if(_0x33aeb3['isDying']())this['playDragonbonesMotion'](_0x1f8a28(0x155));else _0x33aeb3['isUndecided']()?this[_0x1f8a28(0x25e)]('idle'):this[_0x1f8a28(0x25e)](_0x1f8a28(0x155));}}}}}}}},Spriteset_Battle[_0x39f1a0(0x202)][_0x39f1a0(0x19e)]=function(){const _0x37e681=_0x39f1a0;for(const _0x3915ab of this['battlerSprites']()){if(!_0x3915ab)continue;_0x3915ab[_0x37e681(0x19e)]();}},PluginManager[_0x39f1a0(0x1c0)](pluginData[_0x39f1a0(0x133)],_0x39f1a0(0x260),_0x1d035e=>{const _0x461ab4=_0x39f1a0;if(!$gameScreen)return;VisuMZ[_0x461ab4(0x252)](_0x1d035e,_0x1d035e),$gameScreen[_0x461ab4(0x23d)](_0x1d035e['PictureID']);const _0x54c1d0=$gameScreen[_0x461ab4(0x21f)](_0x1d035e[_0x461ab4(0x281)]),_0x24468c=_0x54c1d0[_0x461ab4(0x28c)]();_0x24468c[_0x461ab4(0x1f3)]=_0x1d035e[_0x461ab4(0x25b)],_0x24468c[_0x461ab4(0x183)]=_0x1d035e[_0x461ab4(0x204)],_0x24468c[_0x461ab4(0x292)]=_0x1d035e[_0x461ab4(0x116)],_0x24468c[_0x461ab4(0x280)]=_0x1d035e[_0x461ab4(0x174)],_0x24468c[_0x461ab4(0x1ae)]=_0x1d035e[_0x461ab4(0x218)],_0x24468c['scaleY']=_0x1d035e[_0x461ab4(0x26a)],_0x24468c[_0x461ab4(0x254)]=_0x1d035e[_0x461ab4(0x162)];}),PluginManager[_0x39f1a0(0x1c0)](pluginData[_0x39f1a0(0x133)],_0x39f1a0(0x1fb),_0x118bd6=>{const _0x2eccc9=_0x39f1a0;if(!$gameScreen)return;VisuMZ[_0x2eccc9(0x252)](_0x118bd6,_0x118bd6),$gameScreen['createDefaultPicture'](_0x118bd6[_0x2eccc9(0x281)]);const _0x456f1d=$gameScreen[_0x2eccc9(0x21f)](_0x118bd6[_0x2eccc9(0x281)]),_0x3af7fb=_0x456f1d[_0x2eccc9(0x28c)](),_0x55ccbc=_0x118bd6[_0x2eccc9(0x27d)]||![];_0x3af7fb[_0x2eccc9(0x183)]=_0x118bd6['Animation'],_0x3af7fb[_0x2eccc9(0x14a)]=_0x55ccbc;}),PluginManager[_0x39f1a0(0x1c0)](pluginData[_0x39f1a0(0x133)],_0x39f1a0(0x27c),_0x5ccebb=>{const _0x1fd519=_0x39f1a0;if(!$gameScreen)return;VisuMZ[_0x1fd519(0x252)](_0x5ccebb,_0x5ccebb),$gameScreen[_0x1fd519(0x23d)](_0x5ccebb[_0x1fd519(0x281)]);const _0x4cbbb0=$gameScreen[_0x1fd519(0x21f)](_0x5ccebb[_0x1fd519(0x281)]),_0x2f00b9=_0x4cbbb0[_0x1fd519(0x28c)]();_0x2f00b9[_0x1fd519(0x292)]=_0x5ccebb[_0x1fd519(0x116)],_0x2f00b9[_0x1fd519(0x280)]=_0x5ccebb[_0x1fd519(0x174)];}),PluginManager['registerCommand'](pluginData['name'],_0x39f1a0(0x24b),_0x17e02e=>{const _0x380164=_0x39f1a0;if(!$gameScreen)return;VisuMZ['ConvertParams'](_0x17e02e,_0x17e02e),$gameScreen[_0x380164(0x23d)](_0x17e02e[_0x380164(0x281)]);const _0x18d9ca=$gameScreen[_0x380164(0x21f)](_0x17e02e[_0x380164(0x281)]),_0x5e90d6=_0x18d9ca[_0x380164(0x28c)]();_0x5e90d6[_0x380164(0x1ae)]=_0x17e02e[_0x380164(0x218)],_0x5e90d6['scaleY']=_0x17e02e['ScaleY'];}),PluginManager['registerCommand'](pluginData['name'],_0x39f1a0(0x137),_0x56f8d9=>{const _0x47b66b=_0x39f1a0;if(!$gameScreen)return;VisuMZ[_0x47b66b(0x252)](_0x56f8d9,_0x56f8d9),$gameScreen[_0x47b66b(0x23d)](_0x56f8d9[_0x47b66b(0x281)]);const _0x45729b=$gameScreen[_0x47b66b(0x21f)](_0x56f8d9[_0x47b66b(0x281)]),_0x38a4a1=_0x45729b[_0x47b66b(0x28c)]();_0x38a4a1[_0x47b66b(0x254)]=_0x56f8d9[_0x47b66b(0x162)];}),Game_Screen[_0x39f1a0(0x202)][_0x39f1a0(0x23d)]=function(_0x4556d3){const _0x482797=_0x39f1a0;if(this['picture'](_0x4556d3))return;this['showPicture'](_0x4556d3,'',0x0,Math[_0x482797(0x14c)](Graphics[_0x482797(0x16e)]/0x2),Math[_0x482797(0x14c)](Graphics[_0x482797(0x15d)]/0x2),0x64,0x64,0xff,0x0);},VisuMZ['DragonbonesUnion']['Game_Screen_erasePicture']=Game_Screen[_0x39f1a0(0x202)]['erasePicture'],Game_Screen[_0x39f1a0(0x202)][_0x39f1a0(0x25d)]=function(_0x41afb0){const _0x455494=_0x39f1a0;this[_0x455494(0x21b)](_0x41afb0),VisuMZ['DragonbonesUnion']['Game_Screen_erasePicture']['call'](this,_0x41afb0);},Game_Screen[_0x39f1a0(0x202)][_0x39f1a0(0x21b)]=function(_0x3a7a00){const _0x5c65a6=_0x39f1a0,_0x1ed0db=this[_0x5c65a6(0x17b)](_0x3a7a00),_0x40fa18=this[_0x5c65a6(0x18a)][_0x1ed0db];if(!_0x40fa18)return;_0x40fa18[_0x5c65a6(0x1ed)](),_0x40fa18[_0x5c65a6(0x19e)]();},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x190)]=Game_Picture[_0x39f1a0(0x202)][_0x39f1a0(0x177)],Game_Picture[_0x39f1a0(0x202)]['initialize']=function(){const _0x249af0=_0x39f1a0;VisuMZ[_0x249af0(0x1d0)][_0x249af0(0x190)][_0x249af0(0x21c)](this),this['initDragonbonesData']();},Game_Picture[_0x39f1a0(0x202)][_0x39f1a0(0x1ed)]=function(){this['_dragonbonesData']={'filename':'','animation':DragonbonesManager['DefaultAnimation'],'scaleX':0x1,'scaleY':0x1,'offsetX':0x0,'offsetY':0x0,'timeScale':0x1,'revertToIdle':![]};},Game_Picture[_0x39f1a0(0x202)]['dragonbonesData']=function(){const _0x1364cf=_0x39f1a0;if(this[_0x1364cf(0x1e3)]!==undefined)return this['_dragonbonesData'];return this[_0x1364cf(0x1ed)](),this[_0x1364cf(0x1e3)];},Game_Picture['prototype'][_0x39f1a0(0x1b7)]=function(){const _0x3d7b72=_0x39f1a0;return this[_0x3d7b72(0x28c)]()['filename']!=='';},Game_Picture[_0x39f1a0(0x202)][_0x39f1a0(0x19e)]=function(){const _0x59ff67=_0x39f1a0;if(!SceneManager[_0x59ff67(0x1e1)])return;if(!SceneManager[_0x59ff67(0x1e1)]['_spriteset'])return;const _0x529883=SceneManager[_0x59ff67(0x1e1)][_0x59ff67(0x221)]['findPictureSprite'](this);if(_0x529883)_0x529883[_0x59ff67(0x19e)]();},Spriteset_Base[_0x39f1a0(0x202)]['findPictureSprite']=function(_0x351a3f){const _0x1ee684=_0x39f1a0;return this[_0x1ee684(0x184)]['children'][_0x1ee684(0x25a)](_0x36b994=>_0x36b994&&_0x36b994[_0x1ee684(0x21f)]()===_0x351a3f);},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x1b3)]=Sprite_Picture[_0x39f1a0(0x202)]['initialize'],Sprite_Picture['prototype'][_0x39f1a0(0x177)]=function(_0x4b47bb){const _0x42abaf=_0x39f1a0;this[_0x42abaf(0x1ed)](),VisuMZ[_0x42abaf(0x1d0)][_0x42abaf(0x1b3)][_0x42abaf(0x21c)](this,_0x4b47bb);},Sprite_Picture[_0x39f1a0(0x202)]['initDragonbonesData']=function(_0x4d5087){const _0x359343=_0x39f1a0;this[_0x359343(0x19f)]=null,this[_0x359343(0x115)]='',this[_0x359343(0x1ca)]='';},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x16c)]=Sprite_Picture['prototype']['update'],Sprite_Picture[_0x39f1a0(0x202)][_0x39f1a0(0x1f6)]=function(){const _0xd790ac=_0x39f1a0;VisuMZ[_0xd790ac(0x1d0)][_0xd790ac(0x16c)]['call'](this),this[_0xd790ac(0x13f)]();},Sprite_Picture['prototype'][_0x39f1a0(0x19e)]=function(){const _0x59b5b1=_0x39f1a0;this[_0x59b5b1(0x19f)]&&(this[_0x59b5b1(0x15c)](this[_0x59b5b1(0x19f)]),this[_0x59b5b1(0x19f)][_0x59b5b1(0x1f0)](),this[_0x59b5b1(0x19f)]=null,this['_dragonbonesFilename']='',this[_0x59b5b1(0x1ca)]='');},Sprite_Picture['prototype'][_0x39f1a0(0x13f)]=function(){const _0x3d91cb=_0x39f1a0,_0x286b7b=this[_0x3d91cb(0x21f)]();if(!_0x286b7b)return this[_0x3d91cb(0x19e)]();if(!_0x286b7b['hasDragonbones']())return this['disposeDragonbones']();this['updateDragonbonesArmature']();if(!this['_dragonbones'])return;this[_0x3d91cb(0x1c1)](),this[_0x3d91cb(0x1d4)](),this[_0x3d91cb(0x12f)]();},Sprite_Picture[_0x39f1a0(0x202)][_0x39f1a0(0x1e5)]=function(){const _0x386962=_0x39f1a0,_0xe8fa3a=this[_0x386962(0x21f)]()[_0x386962(0x28c)]();if(this['_dragonbonesFilename']===_0xe8fa3a[_0x386962(0x1f3)])return;this[_0x386962(0x19e)](),this[_0x386962(0x115)]=_0xe8fa3a[_0x386962(0x1f3)],DragonbonesManager[_0x386962(0x236)](_0xe8fa3a['filename'],this[_0x386962(0x135)]['bind'](this));},Sprite_Picture[_0x39f1a0(0x202)]['onLoadDragonbones']=function(){const _0x4b2edd=_0x39f1a0,_0xd4ead3=this[_0x4b2edd(0x21f)]()[_0x4b2edd(0x28c)]();this[_0x4b2edd(0x19f)]=DragonbonesManager[_0x4b2edd(0x1a0)](_0xd4ead3[_0x4b2edd(0x1f3)]),this[_0x4b2edd(0x240)](this['_dragonbones'],0x0),this[_0x4b2edd(0x1c1)]();},Sprite_Picture[_0x39f1a0(0x202)]['updateDragonbonesAnimation']=function(){const _0x36c147=_0x39f1a0;if(!this['_dragonbones'])return;const _0x53896e=this[_0x36c147(0x21f)]()['dragonbonesData']();this['_dragonbonesAnimation']!==_0x53896e['animation']&&(this['_dragonbonesAnimation']=_0x53896e[_0x36c147(0x183)],this[_0x36c147(0x232)]());},Sprite_Picture['prototype'][_0x39f1a0(0x232)]=function(){const _0xba2088=_0x39f1a0;if(!this[_0xba2088(0x19f)])return;const _0x8215be=this[_0xba2088(0x19f)][_0xba2088(0x183)],_0x8a58cf=this['_dragonbonesAnimation'][_0xba2088(0x13d)]()[_0xba2088(0x1bb)]();_0x8215be['animations'][_0x8a58cf]&&_0x8215be[_0xba2088(0x269)](_0x8a58cf);},Sprite_Picture['prototype'][_0x39f1a0(0x1d4)]=function(){const _0x2c1761=_0x39f1a0;if(!this['_dragonbones'])return;const _0x253e84=this[_0x2c1761(0x21f)]()[_0x2c1761(0x28c)]();this['_dragonbones']['x']=_0x253e84[_0x2c1761(0x292)],this[_0x2c1761(0x19f)]['y']=_0x253e84[_0x2c1761(0x280)],this[_0x2c1761(0x19f)][_0x2c1761(0x164)]['x']=_0x253e84[_0x2c1761(0x1ae)],this[_0x2c1761(0x19f)][_0x2c1761(0x164)]['y']=_0x253e84[_0x2c1761(0x257)],this[_0x2c1761(0x19f)][_0x2c1761(0x183)][_0x2c1761(0x1ff)]===![]&&_0x253e84[_0x2c1761(0x14a)]&&(_0x253e84['animation']=_0x2c1761(0x155));},Sprite_Picture['prototype'][_0x39f1a0(0x12f)]=function(){const _0x500e4a=_0x39f1a0;if(!this[_0x500e4a(0x19f)])return;const _0x3a1b74=this[_0x500e4a(0x21f)]()[_0x500e4a(0x28c)]();let _0x5a123d=_0x3a1b74[_0x500e4a(0x254)];this[_0x500e4a(0x19f)][_0x500e4a(0x183)][_0x500e4a(0x254)]=_0x5a123d;},PluginManager['registerCommand'](pluginData[_0x39f1a0(0x133)],_0x39f1a0(0x19b),_0x19f63c=>{const _0x16c963=_0x39f1a0;if(!$gameMap)return;VisuMZ[_0x16c963(0x252)](_0x19f63c,_0x19f63c);const _0x39061c=$gameActors['actor'](_0x19f63c[_0x16c963(0x15f)]);if(!_0x39061c)return;const _0xb1c37f=JsonEx['makeDeepCopy'](_0x39061c[_0x16c963(0x153)]);_0x39061c[_0x16c963(0x153)]={'filename':_0x19f63c['Filename'],'animation':'','scaleX':_0x19f63c['ScaleX'],'scaleY':_0x19f63c['ScaleY'],'offsetX':_0x19f63c['OffsetX'],'offsetY':_0x19f63c[_0x16c963(0x174)],'timeScale':_0x19f63c[_0x16c963(0x162)],'walkRate':_0x19f63c['WalkRate']??0x1,'dashRate':_0x19f63c['DashRate']??0x1,'width':_0x19f63c[_0x16c963(0x247)],'height':_0x19f63c['Height'],'flipLeft':_0x19f63c[_0x16c963(0x206)],'flipRight':_0x19f63c['FlipRight'],'animationNames':{'idle':_0x19f63c[_0x16c963(0x201)],'walk':_0x19f63c[_0x16c963(0x147)],'dash':_0x19f63c[_0x16c963(0x21a)],'jump':_0x19f63c[_0x16c963(0x1c3)],'ladderidle':_0x19f63c['LadderIdle'],'ladderclimb':_0x19f63c[_0x16c963(0x1c2)],'ropeidle':_0x19f63c[_0x16c963(0x24d)],'ropeclimb':_0x19f63c['RopeClimb']}},$gamePlayer[_0x16c963(0x289)]();}),PluginManager['registerCommand'](pluginData[_0x39f1a0(0x133)],'MapSprite_ActorAnimationPlay',_0x2aa225=>{const _0x15610d=_0x39f1a0;if(!$gameMap)return;if(SceneManager[_0x15610d(0x1e1)][_0x15610d(0x19a)]!==Scene_Map)return;VisuMZ[_0x15610d(0x252)](_0x2aa225,_0x2aa225);const _0x7592f1=$gameActors[_0x15610d(0x1df)](_0x2aa225[_0x15610d(0x15f)]),_0x14dcad=_0x7592f1['index'](),_0xc767b3=_0x14dcad===0x0?$gamePlayer:$gamePlayer[_0x15610d(0x13c)]()[_0x15610d(0x293)](_0x14dcad-0x1);if(!_0xc767b3)return;_0xc767b3[_0x15610d(0x185)]=_0x2aa225['Animation'];}),PluginManager[_0x39f1a0(0x1c0)](pluginData[_0x39f1a0(0x133)],_0x39f1a0(0x265),_0x2df33b=>{const _0x2156ca=_0x39f1a0;if(!$gameMap)return;if(SceneManager[_0x2156ca(0x1e1)][_0x2156ca(0x19a)]!==Scene_Map)return;VisuMZ[_0x2156ca(0x252)](_0x2df33b,_0x2df33b);const _0x156749=$gameActors[_0x2156ca(0x1df)](_0x2df33b[_0x2156ca(0x15f)]),_0xfb1e23=_0x156749[_0x2156ca(0x256)](),_0x34dc76=_0xfb1e23===0x0?$gamePlayer:$gamePlayer[_0x2156ca(0x13c)]()['follower'](_0xfb1e23-0x1);if(!_0x34dc76)return;_0x34dc76[_0x2156ca(0x185)]='';}),PluginManager[_0x39f1a0(0x1c0)](pluginData['name'],'MapSprite_EventAnimationPlay',_0x4639f1=>{const _0x5299d3=_0x39f1a0;if(!$gameMap)return;if(SceneManager['_scene']['constructor']!==Scene_Map)return;VisuMZ[_0x5299d3(0x252)](_0x4639f1,_0x4639f1);const _0x5c0f1d=$gameTemp['getLastPluginCommandInterpreter'](),_0x179461=$gameMap[_0x5299d3(0x14d)](_0x4639f1[_0x5299d3(0x134)]||_0x5c0f1d['eventId']());if(!_0x179461)return;_0x179461[_0x5299d3(0x185)]=_0x4639f1[_0x5299d3(0x204)];}),PluginManager['registerCommand'](pluginData[_0x39f1a0(0x133)],_0x39f1a0(0x213),_0x2f8901=>{const _0x484037=_0x39f1a0;if(!$gameMap)return;if(SceneManager[_0x484037(0x1e1)]['constructor']!==Scene_Map)return;VisuMZ['ConvertParams'](_0x2f8901,_0x2f8901);const _0x4e4749=$gameTemp[_0x484037(0x146)](),_0x33cdc3=$gameMap['event'](_0x2f8901['EventID']||_0x4e4749[_0x484037(0x178)]());if(!_0x33cdc3)return;_0x33cdc3[_0x484037(0x185)]='';}),PluginManager[_0x39f1a0(0x1c0)](pluginData[_0x39f1a0(0x133)],_0x39f1a0(0x23b),_0x47a854=>{const _0x33a3a5=_0x39f1a0;if(!$gameMap)return;if(SceneManager['_scene'][_0x33a3a5(0x19a)]!==Scene_Map)return;VisuMZ[_0x33a3a5(0x252)](_0x47a854,_0x47a854);const _0x15d9dd=$gamePlayer[_0x33a3a5(0x13c)]()[_0x33a3a5(0x293)](_0x47a854[_0x33a3a5(0x157)]);if(!_0x15d9dd)return;_0x15d9dd['dragonbonesAnimation']=_0x47a854[_0x33a3a5(0x204)];}),PluginManager[_0x39f1a0(0x1c0)](pluginData['name'],_0x39f1a0(0x279),_0x489700=>{const _0x13c42f=_0x39f1a0;if(!$gameMap)return;if(SceneManager[_0x13c42f(0x1e1)][_0x13c42f(0x19a)]!==Scene_Map)return;VisuMZ[_0x13c42f(0x252)](_0x489700,_0x489700);const _0x5e6a94=$gamePlayer['followers']()[_0x13c42f(0x293)](_0x489700[_0x13c42f(0x157)]);if(!_0x5e6a94)return;_0x5e6a94[_0x13c42f(0x185)]='';}),PluginManager[_0x39f1a0(0x1c0)](pluginData[_0x39f1a0(0x133)],_0x39f1a0(0x18f),_0x536634=>{const _0x186dcc=_0x39f1a0;if(!$gameMap)return;if(SceneManager['_scene'][_0x186dcc(0x19a)]!==Scene_Map)return;VisuMZ['ConvertParams'](_0x536634,_0x536634),$gamePlayer[_0x186dcc(0x185)]=_0x536634[_0x186dcc(0x204)];}),PluginManager['registerCommand'](pluginData['name'],_0x39f1a0(0x20d),_0x1879e0=>{const _0x1bd2cc=_0x39f1a0;if(!$gameMap)return;if(SceneManager[_0x1bd2cc(0x1e1)]['constructor']!==Scene_Map)return;$gamePlayer[_0x1bd2cc(0x185)]='';}),Game_Temp[_0x39f1a0(0x202)]['setLastPluginCommandInterpreter']=function(_0x14958a){const _0x3652dc=_0x39f1a0;this[_0x3652dc(0x1dc)]=_0x14958a;},Game_Temp[_0x39f1a0(0x202)][_0x39f1a0(0x146)]=function(){const _0x4e578e=_0x39f1a0;return this[_0x4e578e(0x1dc)];},Object[_0x39f1a0(0x1eb)](Game_CharacterBase[_0x39f1a0(0x202)],_0x39f1a0(0x185),{'get':function(){const _0x13e5a9=_0x39f1a0;return this[_0x13e5a9(0x169)]()[_0x13e5a9(0x183)];},'set':function(_0x463cdf){const _0x4abdd4=_0x39f1a0;this[_0x4abdd4(0x169)]()[_0x4abdd4(0x183)]=_0x463cdf;},'configurable':!![]}),Game_CharacterBase[_0x39f1a0(0x202)]['initDragonbonesData']=function(){const _0x4c87b9=_0x39f1a0,_0x4bcc92=VisuMZ['DragonbonesUnion']['Settings'][_0x4c87b9(0x1b2)];this[_0x4c87b9(0x153)]={'filename':'','animation':'','scaleX':_0x4bcc92[_0x4c87b9(0x218)],'scaleY':_0x4bcc92['ScaleY'],'offsetX':_0x4bcc92['OffsetX'],'offsetY':_0x4bcc92[_0x4c87b9(0x174)],'timeScale':_0x4bcc92['TimeScale'],'walkRate':0x1,'dashRate':0x1,'width':_0x4bcc92[_0x4c87b9(0x247)],'height':_0x4bcc92[_0x4c87b9(0x207)],'flipLeft':_0x4bcc92[_0x4c87b9(0x206)],'flipRight':_0x4bcc92['FlipRight'],'animationNames':{'idle':_0x4bcc92[_0x4c87b9(0x201)],'walk':_0x4bcc92['Walk'],'dash':_0x4bcc92[_0x4c87b9(0x21a)],'jump':_0x4bcc92[_0x4c87b9(0x1c3)],'ladderidle':_0x4bcc92[_0x4c87b9(0x1cc)],'ladderclimb':_0x4bcc92[_0x4c87b9(0x1c2)],'ropeidle':_0x4bcc92['RopeIdle'],'ropeclimb':_0x4bcc92[_0x4c87b9(0x145)]}},this[_0x4c87b9(0x17e)]===undefined&&(this[_0x4c87b9(0x17e)]=0x0);},Game_CharacterBase[_0x39f1a0(0x202)][_0x39f1a0(0x194)]=function(){},Game_CharacterBase[_0x39f1a0(0x202)][_0x39f1a0(0x1f1)]=function(_0x5e1545){const _0x5a4a27=_0x39f1a0,_0x14f373=this['dragonbonesSpriteData']();_0x5e1545[_0x5a4a27(0x128)](/<DRAGONBONES SPRITE:[ ]*(.*)>/i)&&(_0x14f373[_0x5a4a27(0x1f3)]=String(RegExp['$1'])['trim']());_0x5e1545['match'](/<DRAGONBONES SPRITE (?:SKIN|NAME|FILENAME):[ ]*(.*)>/i)&&(_0x14f373[_0x5a4a27(0x1f3)]=String(RegExp['$1'])[_0x5a4a27(0x1bb)]());_0x5e1545[_0x5a4a27(0x128)](/<DRAGONBONES SPRITE[ ]SCALE:[ ](.*),[ ](.*)>/i)&&(_0x14f373['scaleX']=Number(RegExp['$1']),_0x14f373[_0x5a4a27(0x257)]=Number(RegExp['$2']));_0x5e1545[_0x5a4a27(0x128)](/<DRAGONBONES SPRITE[ ](?:SCALEX|SCALE X):[ ](.*)>/i)&&(_0x14f373[_0x5a4a27(0x1ae)]=Number(RegExp['$1']));_0x5e1545[_0x5a4a27(0x128)](/<DRAGONBONES SPRITE[ ](?:SCALEY|SCALE Y):[ ](.*)>/i)&&(_0x14f373[_0x5a4a27(0x257)]=Number(RegExp['$1']));_0x5e1545[_0x5a4a27(0x128)](/<DRAGONBONES SPRITE[ ]OFFSET:[ ](.*),[ ](.*)>/i)&&(_0x14f373[_0x5a4a27(0x292)]=Number(RegExp['$1']),_0x14f373['offsetY']=Number(RegExp['$2']));_0x5e1545[_0x5a4a27(0x128)](/<DRAGONBONES SPRITE[ ](?:OFFSETX|OFFSET X):[ ](.*)>/i)&&(_0x14f373[_0x5a4a27(0x292)]=Number(RegExp['$1']));_0x5e1545['match'](/<DRAGONBONES SPRITE[ ](?:OFFSETY|OFFSET Y):[ ](.*)>/i)&&(_0x14f373[_0x5a4a27(0x280)]=Number(RegExp['$1']));_0x5e1545['match'](/<DRAGONBONES SPRITE[ ]SIZE:[ ](.*),[ ](.*)>/i)&&(_0x14f373[_0x5a4a27(0x16e)]=Number(RegExp['$1']),_0x14f373['height']=Number(RegExp['$2']));_0x5e1545['match'](/<DRAGONBONES SPRITE[ ]WIDTH:[ ](.*)>/i)&&(_0x14f373[_0x5a4a27(0x16e)]=Number(RegExp['$1']));_0x5e1545[_0x5a4a27(0x128)](/<DRAGONBONES SPRITE[ ]HEIGHT:[ ](.*)>/i)&&(_0x14f373[_0x5a4a27(0x15d)]=Number(RegExp['$1']));_0x5e1545[_0x5a4a27(0x128)](/<DRAGONBONES SPRITE[ ](?:TIMESCALE|TIME SCALE):[ ](.*)>/i)&&(_0x14f373[_0x5a4a27(0x254)]=Number(RegExp['$1']));_0x5e1545['match'](/<DRAGONBONES SPRITE[ ](?:WALK RATE|WALKING RATE):[ ](.*)>/i)&&(_0x14f373[_0x5a4a27(0x19c)]=Number(RegExp['$1']));_0x5e1545[_0x5a4a27(0x128)](/<DRAGONBONES SPRITE[ ](?:DASH RATE|DASHING RATE):[ ](.*)>/i)&&(_0x14f373[_0x5a4a27(0x23c)]=Number(RegExp['$1']));_0x5e1545[_0x5a4a27(0x128)](/<DRAGONBONES SPRITE FLIP LEFT>/i)&&(_0x14f373[_0x5a4a27(0x13e)]=!![]);_0x5e1545[_0x5a4a27(0x128)](/<DRAGONBONES SPRITE NO FLIP LEFT>/i)&&(_0x14f373[_0x5a4a27(0x13e)]=![]);_0x5e1545['match'](/<DRAGONBONES SPRITE FLIP RIGHT>/i)&&(_0x14f373['flipRight']=!![]);_0x5e1545[_0x5a4a27(0x128)](/<DRAGONBONES SPRITE NO FLIP RIGHT>/i)&&(_0x14f373[_0x5a4a27(0x1e9)]=![]);const _0x3f0a28=_0x5e1545[_0x5a4a27(0x128)](/<DRAGONBONES SPRITE MOTION (.*):[ ](.*)>/gi);if(_0x3f0a28)for(const _0x3985ac of _0x3f0a28){_0x3985ac[_0x5a4a27(0x128)](/<DRAGONBONES SPRITE MOTION (.*):[ ](.*)>/i);const _0x103fdf=String(RegExp['$1'])[_0x5a4a27(0x13d)]()[_0x5a4a27(0x1bb)](),_0x5469ac=String(RegExp['$2'])[_0x5a4a27(0x13d)]()[_0x5a4a27(0x1bb)]();_0x14f373[_0x5a4a27(0x20f)][_0x103fdf]=_0x5469ac;}if(_0x5e1545[_0x5a4a27(0x128)](/<DRAGONBONES SPRITE (?:SETTINGS|SETTING)>\s*([\s\S]*)\s*<\/DRAGONBONES SPRITE (?:SETTINGS|SETTING)>/i)){const _0x336408=String(RegExp['$1']);_0x336408[_0x5a4a27(0x128)](/(?:SKIN|NAME|FILENAME):[ ]*(.*)/i)&&(_0x14f373['filename']=String(RegExp['$1'])[_0x5a4a27(0x1bb)]());_0x336408[_0x5a4a27(0x128)](/SCALE:[ ](.*),[ ](.*)/i)&&(_0x14f373[_0x5a4a27(0x1ae)]=Number(RegExp['$1']),_0x14f373[_0x5a4a27(0x257)]=Number(RegExp['$2']));_0x336408[_0x5a4a27(0x128)](/(?:SCALEX|SCALE X):[ ](.*)/i)&&(_0x14f373[_0x5a4a27(0x1ae)]=Number(RegExp['$1']));_0x336408['match'](/(?:SCALEY|SCALE Y):[ ](.*)/i)&&(_0x14f373[_0x5a4a27(0x257)]=Number(RegExp['$1']));_0x336408['match'](/OFFSET:[ ](.*),[ ](.*)/i)&&(_0x14f373['offsetX']=Number(RegExp['$1']),_0x14f373[_0x5a4a27(0x280)]=Number(RegExp['$2']));_0x336408[_0x5a4a27(0x128)](/(?:OFFSETX|OFFSET X):[ ](.*)/i)&&(_0x14f373['offsetX']=Number(RegExp['$1']));_0x336408[_0x5a4a27(0x128)](/(?:OFFSETY|OFFSET Y):[ ](.*)/i)&&(_0x14f373[_0x5a4a27(0x280)]=Number(RegExp['$1']));_0x336408[_0x5a4a27(0x128)](/(?:TIMESCALE|TIME SCALE):[ ](.*)/i)&&(_0x14f373[_0x5a4a27(0x254)]=Number(RegExp['$1']));_0x336408[_0x5a4a27(0x128)](/(?:WALK RATE|WALKING RATE):[ ](.*)/i)&&(_0x14f373[_0x5a4a27(0x19c)]=Number(RegExp['$1']));_0x336408[_0x5a4a27(0x128)](/(?:DASH RATE|DASHING RATE):[ ](.*)/i)&&(_0x14f373[_0x5a4a27(0x23c)]=Number(RegExp['$1']));_0x336408['match'](/SIZE:[ ](.*),[ ](.*)/i)&&(_0x14f373[_0x5a4a27(0x16e)]=Number(RegExp['$1']),_0x14f373[_0x5a4a27(0x15d)]=Number(RegExp['$2']));_0x336408[_0x5a4a27(0x128)](/WIDTH:[ ](.*)/i)&&(_0x14f373[_0x5a4a27(0x16e)]=Number(RegExp['$1']));_0x336408[_0x5a4a27(0x128)](/HEIGHT:[ ](.*)/i)&&(_0x14f373[_0x5a4a27(0x15d)]=Number(RegExp['$1']));_0x336408[_0x5a4a27(0x128)](/NO FLIP LEFT/i)&&(_0x14f373[_0x5a4a27(0x13e)]=![]);_0x336408[_0x5a4a27(0x128)](/FLIP LEFT/i)&&(_0x14f373[_0x5a4a27(0x13e)]=!![]);_0x336408[_0x5a4a27(0x128)](/NO FLIP RIGHT/i)&&(_0x14f373[_0x5a4a27(0x1e9)]=![]);_0x336408[_0x5a4a27(0x128)](/FLIP RIGHT/i)&&(_0x14f373[_0x5a4a27(0x1e9)]=!![]);const _0x4aabba=_0x5e1545[_0x5a4a27(0x128)](/(?:ANI|MOTION) (.*):[ ](.*)/gi);if(_0x4aabba)for(const _0x2054d0 of _0x4aabba){_0x2054d0[_0x5a4a27(0x128)](/(?:ANI|MOTION) (.*):[ ](.*)/i);const _0x4e7841=String(RegExp['$1'])[_0x5a4a27(0x13d)]()[_0x5a4a27(0x1bb)](),_0x53b20b=String(RegExp['$2'])[_0x5a4a27(0x13d)]()[_0x5a4a27(0x1bb)]();_0x14f373[_0x5a4a27(0x20f)][_0x4e7841]=_0x53b20b;}}},Game_CharacterBase[_0x39f1a0(0x202)][_0x39f1a0(0x169)]=function(){const _0x4a4173=_0x39f1a0;if(this['_dragonbonesSpriteData']!==undefined)return this[_0x4a4173(0x153)];return this[_0x4a4173(0x1ed)](),this[_0x4a4173(0x194)](),this[_0x4a4173(0x153)];},Game_CharacterBase[_0x39f1a0(0x202)][_0x39f1a0(0x1b7)]=function(){const _0x366f4b=_0x39f1a0;return this[_0x366f4b(0x169)]()['filename']!=='';},Game_CharacterBase[_0x39f1a0(0x202)]['currentDragonbonesAnimation']=function(_0x159554){const _0x382793=_0x39f1a0,_0x784018=this[_0x382793(0x169)]();if(!_0x159554)return _0x784018[_0x382793(0x20f)][_0x382793(0x155)];_0x784018[_0x382793(0x183)]=_0x784018['animation'][_0x382793(0x13d)]()[_0x382793(0x1bb)]();if(_0x784018[_0x382793(0x183)]!==''&&_0x159554['animation'][_0x382793(0x282)][_0x784018[_0x382793(0x183)]])return _0x784018[_0x382793(0x183)];let _0x4b7d8a=[];if(this[_0x382793(0x141)]())_0x4b7d8a=_0x4b7d8a[_0x382793(0x195)](this[_0x382793(0x1da)](_0x784018['animationNames'][_0x382793(0x22c)])),_0x4b7d8a=_0x4b7d8a['concat'](this[_0x382793(0x1da)](_0x784018['animationNames'][_0x382793(0x286)]));else{if(this['isOnLadder']()&&!this[_0x382793(0x141)]())Imported[_0x382793(0x251)]&&this[_0x382793(0x118)]()?(this['_dragonbonesMoveTimer']>0x0&&(_0x4b7d8a[_0x382793(0x1fd)](_0x784018[_0x382793(0x20f)][_0x382793(0x181)]),_0x4b7d8a[_0x382793(0x1fd)](_0x784018[_0x382793(0x20f)]['ladderclimb']),_0x4b7d8a=_0x4b7d8a[_0x382793(0x195)](this[_0x382793(0x1da)](_0x784018[_0x382793(0x20f)][_0x382793(0x286)]))),_0x4b7d8a['push'](_0x784018[_0x382793(0x20f)][_0x382793(0x15a)]),_0x4b7d8a[_0x382793(0x1fd)](_0x784018['animationNames']['ladderidle'])):(this[_0x382793(0x17e)]>0x0&&(_0x4b7d8a[_0x382793(0x1fd)](_0x784018[_0x382793(0x20f)]['ladderclimb']),_0x4b7d8a=_0x4b7d8a[_0x382793(0x195)](this['addDragonbonesAnimationDirections'](_0x784018[_0x382793(0x20f)]['walk']))),_0x4b7d8a[_0x382793(0x1fd)](_0x784018['animationNames']['ladderidle']));else this[_0x382793(0x17e)]>0x0&&(this['isDashing']()&&(_0x4b7d8a=_0x4b7d8a['concat'](this['addDragonbonesAnimationDirections'](_0x784018[_0x382793(0x20f)][_0x382793(0x1e2)]))),_0x4b7d8a=_0x4b7d8a[_0x382793(0x195)](this[_0x382793(0x1da)](_0x784018[_0x382793(0x20f)]['walk'])));}_0x4b7d8a=_0x4b7d8a['concat'](this['addDragonbonesAnimationDirections'](_0x784018[_0x382793(0x20f)][_0x382793(0x155)]));for(const _0x191020 of _0x4b7d8a){if(_0x159554[_0x382793(0x183)][_0x382793(0x282)][_0x191020])return _0x191020;}return _0x784018[_0x382793(0x20f)][_0x382793(0x155)];},Game_CharacterBase['prototype'][_0x39f1a0(0x1da)]=function(_0x48cd34){const _0x1a2a56=_0x39f1a0,_0x270732=this['dragonbonesSpriteData'](),_0x13061f=this[_0x1a2a56(0x18d)]();let _0x30fde6=[];_0x30fde6[_0x1a2a56(0x1fd)](_0x48cd34+_0x13061f);if(_0x13061f===0x1){_0x30fde6[_0x1a2a56(0x1fd)](_0x48cd34+0x4);if(_0x270732[_0x1a2a56(0x13e)])_0x30fde6[_0x1a2a56(0x1fd)](_0x48cd34+0x6);_0x30fde6[_0x1a2a56(0x1fd)](_0x48cd34+0x2);}if(_0x13061f===0x3){_0x30fde6[_0x1a2a56(0x1fd)](_0x48cd34+0x6);if(_0x270732['flipRight'])_0x30fde6['push'](_0x48cd34+0x4);_0x30fde6[_0x1a2a56(0x1fd)](_0x48cd34+0x2);}if(_0x13061f===0x7){_0x30fde6[_0x1a2a56(0x1fd)](_0x48cd34+0x4);if(_0x270732[_0x1a2a56(0x13e)])_0x30fde6[_0x1a2a56(0x1fd)](_0x48cd34+0x6);_0x30fde6[_0x1a2a56(0x1fd)](_0x48cd34+0x8);}if(_0x13061f===0x9){_0x30fde6[_0x1a2a56(0x1fd)](_0x48cd34+0x6);if(_0x270732[_0x1a2a56(0x1e9)])_0x30fde6[_0x1a2a56(0x1fd)](_0x48cd34+0x4);_0x30fde6[_0x1a2a56(0x1fd)](_0x48cd34+0x8);}return _0x30fde6[_0x1a2a56(0x1fd)](_0x48cd34),_0x30fde6;},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x1cd)]=Game_CharacterBase[_0x39f1a0(0x202)][_0x39f1a0(0x1f6)],Game_CharacterBase[_0x39f1a0(0x202)][_0x39f1a0(0x1f6)]=function(){const _0xf525d7=_0x39f1a0;VisuMZ[_0xf525d7(0x1d0)][_0xf525d7(0x1cd)][_0xf525d7(0x21c)](this),this['updateDragonbonesUnion']();},Game_CharacterBase[_0x39f1a0(0x202)][_0x39f1a0(0x1e8)]=function(){const _0x263e52=_0x39f1a0;if(!this[_0x263e52(0x1b7)]())return;this[_0x263e52(0x193)]()?this[_0x263e52(0x17e)]=VisuMZ['DragonbonesUnion']['Settings']['MapSprite']['WalkTimer']:this[_0x263e52(0x17e)]--;},VisuMZ['DragonbonesUnion'][_0x39f1a0(0x142)]=Game_Player[_0x39f1a0(0x202)][_0x39f1a0(0x289)],Game_Player['prototype'][_0x39f1a0(0x289)]=function(){const _0x6616a7=_0x39f1a0;VisuMZ['DragonbonesUnion'][_0x6616a7(0x142)][_0x6616a7(0x21c)](this),this[_0x6616a7(0x194)]();},Game_Player[_0x39f1a0(0x202)]['setupDragonbonesData']=function(){const _0x156b10=_0x39f1a0,_0x3fee8d=$gameParty['leader']();!_0x3fee8d?this[_0x156b10(0x1ed)]():this['_dragonbonesSpriteData']=_0x3fee8d[_0x156b10(0x169)]();},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x1a9)]=Game_Follower[_0x39f1a0(0x202)][_0x39f1a0(0x289)],Game_Follower['prototype']['refresh']=function(){const _0x119161=_0x39f1a0;VisuMZ['DragonbonesUnion']['Game_Follower_refresh'][_0x119161(0x21c)](this),this[_0x119161(0x194)]();},Game_Follower[_0x39f1a0(0x202)][_0x39f1a0(0x194)]=function(){const _0x3aeefd=_0x39f1a0,_0xf2e4c8=this[_0x3aeefd(0x1df)]();!_0xf2e4c8?this[_0x3aeefd(0x1ed)]():this['_dragonbonesSpriteData']=_0xf2e4c8['dragonbonesSpriteData']();},Game_Actor[_0x39f1a0(0x202)]['initDragonbonesData']=function(){const _0x3d15de=_0x39f1a0;Game_BattlerBase[_0x3d15de(0x202)][_0x3d15de(0x1ed)][_0x3d15de(0x21c)](this),Game_CharacterBase['prototype'][_0x3d15de(0x1ed)][_0x3d15de(0x21c)](this);},Game_Actor[_0x39f1a0(0x202)][_0x39f1a0(0x194)]=function(){const _0x4c85f0=_0x39f1a0;Game_BattlerBase['prototype']['setupDragonbonesData'][_0x4c85f0(0x21c)](this);const _0x516e23=this[_0x4c85f0(0x1df)]()['note'];Game_CharacterBase[_0x4c85f0(0x202)]['checkDragonbonesStringTags'][_0x4c85f0(0x21c)](this,_0x516e23);},Game_Actor[_0x39f1a0(0x202)]['dragonbonesSpriteData']=function(){const _0x1b4c75=_0x39f1a0;if(this['_dragonbonesSpriteData']!==undefined)return this['_dragonbonesSpriteData'];return this[_0x1b4c75(0x1ed)](),this[_0x1b4c75(0x194)](),this[_0x1b4c75(0x153)];},VisuMZ['DragonbonesUnion'][_0x39f1a0(0x1ba)]=Game_Event['prototype']['clearPageSettings'],Game_Event[_0x39f1a0(0x202)][_0x39f1a0(0x138)]=function(){const _0x8b411a=_0x39f1a0;VisuMZ[_0x8b411a(0x1d0)][_0x8b411a(0x1ba)][_0x8b411a(0x21c)](this),this[_0x8b411a(0x1ed)]();},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x273)]=Game_Event[_0x39f1a0(0x202)][_0x39f1a0(0x1ac)],Game_Event[_0x39f1a0(0x202)][_0x39f1a0(0x1ac)]=function(){const _0x3ed8e3=_0x39f1a0;VisuMZ['DragonbonesUnion'][_0x3ed8e3(0x273)][_0x3ed8e3(0x21c)](this),this[_0x3ed8e3(0x1ed)](),this[_0x3ed8e3(0x194)]();},Game_Event[_0x39f1a0(0x202)][_0x39f1a0(0x194)]=function(){const _0x36e256=_0x39f1a0;this[_0x36e256(0x294)](),this[_0x36e256(0x217)]();},Game_Event['prototype'][_0x39f1a0(0x294)]=function(){const _0x483aa1=_0x39f1a0;if(!this[_0x483aa1(0x14d)]())return;const _0x5aca92=this[_0x483aa1(0x14d)]()[_0x483aa1(0x288)];if(_0x5aca92==='')return;this['checkDragonbonesStringTags'](_0x5aca92);},Game_Event[_0x39f1a0(0x202)]['setupDragonbonesDataCommentTags']=function(){const _0x5a25e9=_0x39f1a0;if(!this[_0x5a25e9(0x14d)]())return;if(!this[_0x5a25e9(0x130)]())return;const _0x81ba4e=this[_0x5a25e9(0x1b9)]();let _0xfd1256='';for(const _0x24fbf2 of _0x81ba4e){if([0x6c,0x198][_0x5a25e9(0x222)](_0x24fbf2[_0x5a25e9(0x25f)])){if(_0xfd1256!=='')_0xfd1256+='\x0a';_0xfd1256+=_0x24fbf2[_0x5a25e9(0x208)][0x0];}}this['checkDragonbonesStringTags'](_0xfd1256);},VisuMZ[_0x39f1a0(0x1d0)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x39f1a0(0x202)][_0x39f1a0(0x200)],Game_Interpreter[_0x39f1a0(0x202)][_0x39f1a0(0x200)]=function(_0x5cbc87){const _0x68926a=_0x39f1a0;return $gameTemp[_0x68926a(0x127)](this),VisuMZ[_0x68926a(0x1d0)][_0x68926a(0x150)][_0x68926a(0x21c)](this,_0x5cbc87);},VisuMZ['DragonbonesUnion'][_0x39f1a0(0x151)]=Sprite_Character['prototype'][_0x39f1a0(0x177)],Sprite_Character[_0x39f1a0(0x202)]['initialize']=function(_0x410e9d){const _0x3adb3e=_0x39f1a0;this['initDragonbonesData'](),VisuMZ[_0x3adb3e(0x1d0)][_0x3adb3e(0x151)]['call'](this,_0x410e9d),this['createBaseDragonbonesSprite']();},Sprite_Character[_0x39f1a0(0x202)][_0x39f1a0(0x1ed)]=function(){const _0x2fcc02=_0x39f1a0;this['_dragonbones']=null,this[_0x2fcc02(0x115)]='',this[_0x2fcc02(0x1ca)]='';},Sprite_Character['prototype'][_0x39f1a0(0x187)]=function(){const _0xc84266=_0x39f1a0;this[_0xc84266(0x1a6)]=new Sprite(),this['addChild'](this['_baseDragonbonesSprite']);},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x276)]=Sprite_Character['prototype'][_0x39f1a0(0x1b8)],Sprite_Character[_0x39f1a0(0x202)]['updateBitmap']=function(){const _0x56c81f=_0x39f1a0;VisuMZ[_0x56c81f(0x1d0)][_0x56c81f(0x276)][_0x56c81f(0x21c)](this),this[_0x56c81f(0x13f)]();},Sprite_Character['prototype'][_0x39f1a0(0x19e)]=function(){const _0xbd243c=_0x39f1a0;this[_0xbd243c(0x19f)]&&(this[_0xbd243c(0x1a6)][_0xbd243c(0x15c)](this[_0xbd243c(0x19f)]),this[_0xbd243c(0x19f)][_0xbd243c(0x1f0)](),this[_0xbd243c(0x19f)]=null,this[_0xbd243c(0x115)]='',this[_0xbd243c(0x1ca)]='');},Sprite_Character[_0x39f1a0(0x202)]['updateDragonbones']=function(){const _0x1908d4=_0x39f1a0;if(!this[_0x1908d4(0x284)])return this['disposeDragonbones']();if(!this[_0x1908d4(0x284)][_0x1908d4(0x1b7)]())return this[_0x1908d4(0x19e)]();this['updateDragonbonesArmature']();if(!this[_0x1908d4(0x19f)])return;this['updateDragonbonesAnimation'](),this[_0x1908d4(0x1d4)](),this['updateDragonbonesTimeScale']();},Sprite_Character[_0x39f1a0(0x202)]['updateDragonbonesArmature']=function(){const _0x223422=_0x39f1a0,_0x434bad=this[_0x223422(0x284)][_0x223422(0x169)]();if(this[_0x223422(0x115)]===_0x434bad[_0x223422(0x1f3)])return;this[_0x223422(0x19e)](),this[_0x223422(0x115)]=_0x434bad[_0x223422(0x1f3)],DragonbonesManager['loadArmature'](_0x434bad['filename'],this[_0x223422(0x135)][_0x223422(0x11d)](this));},Sprite_Character[_0x39f1a0(0x202)][_0x39f1a0(0x135)]=function(){const _0x21641d=_0x39f1a0,_0x1128b5=this[_0x21641d(0x284)][_0x21641d(0x169)]();this[_0x21641d(0x19f)]=DragonbonesManager[_0x21641d(0x1a0)](_0x1128b5[_0x21641d(0x1f3)]),this['updateDragonbonesAnimation'](),setTimeout(this[_0x21641d(0x270)][_0x21641d(0x11d)](this),0x0);},Sprite_Character[_0x39f1a0(0x202)][_0x39f1a0(0x270)]=function(){const _0x538b29=_0x39f1a0;if(!this[_0x538b29(0x19f)])return;if(!this[_0x538b29(0x1a6)])return;this[_0x538b29(0x1a6)]['addChildAt'](this[_0x538b29(0x19f)],0x0);},Sprite_Character[_0x39f1a0(0x202)]['updateDragonbonesAnimation']=function(){const _0x4be024=_0x39f1a0;if(!this[_0x4be024(0x19f)])return;const _0x39fe8d=this['_character'][_0x4be024(0x169)](),_0x54bd19=this['_dragonbones'][_0x4be024(0x183)],_0x2597a9=this['_character'][_0x4be024(0x28a)](this[_0x4be024(0x19f)]);_0x54bd19['isCompleted']&&(_0x2597a9&&_0x2597a9[_0x4be024(0x128)](/(?:IDLE|WALK|DASH)(\d+)/i)&&(this[_0x4be024(0x284)][_0x4be024(0x185)]=''),this['_dragonbonesAnimation']='',_0x54bd19['lastAnimationName']=''),this[_0x4be024(0x1ca)]!==_0x2597a9&&(this[_0x4be024(0x1ca)]=_0x2597a9,this['playDragonbonesAnimation']());},Sprite_Character[_0x39f1a0(0x202)][_0x39f1a0(0x232)]=function(){const _0x11c6f5=_0x39f1a0;if(!this[_0x11c6f5(0x19f)])return;const _0x4a49d4=this['_dragonbones'][_0x11c6f5(0x183)],_0x4ddd71=this['_dragonbonesAnimation'][_0x11c6f5(0x13d)]()[_0x11c6f5(0x1bb)]();if(_0x4a49d4[_0x11c6f5(0x282)][_0x4ddd71]){if(_0x4a49d4[_0x11c6f5(0x28b)]===_0x4ddd71&&_0x4a49d4[_0x11c6f5(0x282)][_0x4ddd71][_0x11c6f5(0x24e)]<=0x0)return;_0x4a49d4['play'](_0x4ddd71);}},Sprite_Character[_0x39f1a0(0x202)][_0x39f1a0(0x1d4)]=function(){const _0x314ca7=_0x39f1a0;if(!this[_0x314ca7(0x19f)])return;const _0x514e91=this[_0x314ca7(0x284)][_0x314ca7(0x169)]();this[_0x314ca7(0x19f)]['x']=_0x514e91['offsetX'],this[_0x314ca7(0x19f)]['y']=_0x514e91[_0x314ca7(0x280)],this[_0x314ca7(0x19f)][_0x314ca7(0x164)]['x']=_0x514e91[_0x314ca7(0x1ae)]*this[_0x314ca7(0x12b)](),this[_0x314ca7(0x19f)][_0x314ca7(0x164)]['y']=_0x514e91[_0x314ca7(0x257)];},Sprite_Character['prototype'][_0x39f1a0(0x12b)]=function(){const _0x404d9a=_0x39f1a0,_0x3a4737=this[_0x404d9a(0x284)]['dragonbonesSpriteData']();this['_dragonbonesFlipDirection']=this[_0x404d9a(0x216)]||0x1;if(_0x3a4737[_0x404d9a(0x13e)]&&[0x1,0x4,0x7][_0x404d9a(0x222)](this[_0x404d9a(0x284)]['direction']()))this[_0x404d9a(0x216)]=-0x1;else{if(_0x3a4737[_0x404d9a(0x1e9)]&&[0x9,0x6,0x3]['includes'](this[_0x404d9a(0x284)]['direction']()))this[_0x404d9a(0x216)]=-0x1;else![0x8,0x2][_0x404d9a(0x222)](this[_0x404d9a(0x284)][_0x404d9a(0x18d)]())&&(this[_0x404d9a(0x216)]=0x1);}return this[_0x404d9a(0x216)];},Sprite_Character[_0x39f1a0(0x202)]['updateDragonbonesTimeScale']=function(){const _0xc26a3d=_0x39f1a0;if(!this[_0xc26a3d(0x19f)])return;const _0x360230=this['_character'][_0xc26a3d(0x169)]();let _0x102d45=_0x360230[_0xc26a3d(0x254)];this['_character'][_0xc26a3d(0x193)]()&&(_0x102d45*=this[_0xc26a3d(0x284)][_0xc26a3d(0x121)](),this['_character'][_0xc26a3d(0x143)]()?_0x102d45*=_0x360230[_0xc26a3d(0x23c)]:_0x102d45*=_0x360230[_0xc26a3d(0x19c)]),this[_0xc26a3d(0x19f)][_0xc26a3d(0x183)][_0xc26a3d(0x254)]=_0x102d45;},VisuMZ[_0x39f1a0(0x1d0)][_0x39f1a0(0x11e)]=Sprite_Character[_0x39f1a0(0x202)]['updateCharacterFrame'],Sprite_Character[_0x39f1a0(0x202)][_0x39f1a0(0x11b)]=function(){const _0xe40304=_0x39f1a0;this['_character']&&this[_0xe40304(0x284)][_0xe40304(0x1b7)]()?this[_0xe40304(0x132)]():VisuMZ[_0xe40304(0x1d0)]['Sprite_Character_updateCharacterFrame']['call'](this);},Sprite_Character[_0x39f1a0(0x202)][_0x39f1a0(0x132)]=function(){const _0x4c39c7=_0x39f1a0,_0x11355f=this[_0x4c39c7(0x284)][_0x4c39c7(0x169)](),_0x33ca7f=_0x11355f['height'];this[_0x4c39c7(0x1f5)](0x0,0x0,0x0,_0x33ca7f);};